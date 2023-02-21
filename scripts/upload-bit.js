#!/usr/bin/env node
process.env.PRISMA_DISABLE_WARNINGS = 1;

import { existsSync, rmSync, statSync } from 'fs';
import { PrismaClient } from '@prisma/client';
import minimist from 'minimist';
import path from 'path';
import prompts from 'prompts';
import { spawnSync } from 'child_process';
import { B2 } from './lib/b2-transpiled.js';
import chalk from 'chalk';
import { readFile, writeFile } from 'fs/promises';

const prompt = prompts;

const args = minimist(process.argv.slice(2));

if (!args._[0]) {
  console.log('Usage: bit [file] -a <artifact id> -n');
  console.log('  -a to attach to artifact id');
  console.log('  -t to add test video tag');
  console.log('  -q to add q+a tag');
  console.log('  -j to add journal tag');
  console.log('  -n to add notes');
  console.log('  -f to override filenames');
  console.log('  -w for world mode');
  process.exit(1);
}
const files = args._.map((x) => (x.startsWith('https://') ? x : path.resolve(x)));

const world = args.w;

let missingFiles = false;
for (const file of files) {
  if (!file.startsWith('https://') && !existsSync(file)) {
    console.log(`File ${file} does not exist`);
    missingFiles = true;
  }
}
if (missingFiles) {
  process.exit(1);
}

const artifactId = args.a;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});
const b2 = new B2(process.env.B2_ID, process.env.B2_KEY).bucket(process.env.B2_BUCKET_ID);

if (artifactId) {
  const artifact = await prisma.artifactEntry.findUnique({
    where: {
      id: artifactId
    }
  });
  if (!artifact) {
    console.log('Artifact does not exist');
    process.exit(1);
  }
}

outer: for (let file of files) {
  let filename = path.basename(file);

  let date = new Date();

  if (file.startsWith('https://')) {
    const url = new URL(file);

    url.searchParams.delete('width');
    url.searchParams.delete('height');

    filename = path.basename(url.pathname);
    file = `/tmp/bit-uploader-dl${Date.now()}${path.extname(url.pathname)}`;

    console.log(`Downloading ${url} to ${file}...`);
    const response = await fetch(url);

    if (response.headers.has('last-modified')) {
      date = new Date(response.headers.get('last-modified'));
    }

    const discordCDNMatches = [
      /https:\/\/cdn\.discordapp\.com\/attachments\/\d+\/(\d+)\/(.+)/,
      /https:\/\/media\.discordapp\.net\/attachments\/\d+\/(\d+)\/(.+)/
    ];

    for (const match of discordCDNMatches) {
      const m = url.toString().match(match);
      if (m) {
        // get date
        const snowflake = m[1];
        const timestamp = (BigInt(snowflake) >> 22n) + 1420070400000n;
        date = new Date(Number(timestamp));
      }
    }

    await writeFile(file, new Uint8Array(await response.arrayBuffer()));
  } else {
    date = statSync(file).mtime;
  }

  if (args.d) {
    date = new Date(args.d);
  }

  console.log(`\nUploading ${file}:`);

  filename = `${path.basename(filename, path.extname(filename))}${path
    .extname(filename)
    .toLowerCase()}`;

  const ext = path.extname(file).toLowerCase();
  let overrideFilename =
    args.f ||
    ['latest-capture', 'image', 'video'].includes(path.basename(filename, ext).toLowerCase());
  while (overrideFilename || (await prisma.bit.findUnique({ where: { filename } }))) {
    overrideFilename = false;
    console.log('');
    console.log(
      overrideFilename
        ? 'Enter desired filename:'
        : 'Bit with this filename already exists. Enter a new path:'
    );
    if (!overrideFilename) {
      console.log(`  Filename:      ${chalk.red(filename)}`);
    }
    console.log(
      `  Last Modified: ${chalk.green(date.toISOString().slice(0, 10))} ${chalk.green(
        date.toISOString().slice(11, 19)
      )}`
    );
    console.log('');
    const response = await prompt({
      type: 'text',
      name: 'path',
      message: 'Path',
      initial: `${date.toISOString().slice(0, 10)}_${date
        .toISOString()
        .slice(11, 19)
        .replace(/:/g, '-')}_${path.basename(filename, ext)}`.replace(
        /_(latest-capture|image|video)$/i,
        ''
      )
    });
    if (!response.path) {
      continue outer;
    }
    filename = response.path;
    if (!filename.endsWith(ext)) {
      filename += ext;
    }
  }

  let tmpPath = '';
  if (
    [
      '.mp4',
      '.mov',
      '.webm',
      '.mkv',
      '.avi',
      '.av1',
      '.flv',
      '.wmv',
      '.mpg',
      '.mpeg',
      '.m4v',
      '.3gp',
      '.3g2'
    ].includes(ext)
  ) {
    console.log('Video file detected');
    filename = `${path.basename(filename, ext)}.mp4`;
    tmpPath = `/tmp/bit-uploader-${Date.now()}.mp4`;

    spawnSync('ffmpeg', [
      '-i',
      file,
      '-c:v',
      'h264_nvenc',
      '-preset:v',
      'slow',
      '-tune:v',
      'hq',
      '-rc:v',
      'vbr',
      '-cq:v',
      '24',
      '-b:v',
      '0',
      '-profile:v',
      'high',
      '-c:a',
      'aac',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      '-y',
      tmpPath
    ]);
  } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) {
    console.log('Image file detected');
    filename = `${path.basename(filename, ext)}.png`;
    tmpPath = `/tmp/bit-uploader-${Date.now()}.png`;
    spawnSync('ffmpeg', ['-i', file, '-y', tmpPath]);
  } else if (['.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a'].includes(ext)) {
    console.log('Audio file detected');
    filename = `${path.basename(filename, ext)}.mp3`;
    tmpPath = `/tmp/bit-uploader-${Date.now()}.mp3`;
    spawnSync('ffmpeg', ['-i', file, '-c:a', 'libmp3lame', '-q:a', '4', '-y', tmpPath]);
  } else {
    console.log('Blob file detected');
    tmpPath = file;
  }

  // let thisNotes = notes;
  // if (notes && typeof notes === 'boolean') {
  //   const response = await prompt({
  //     type: 'text',
  //     name: 'notes',
  //     message: 'Notes',
  //     initial: ''
  //   });
  //   if (!response.notes) {
  //     notes
  //   }
  // }

  if (!world) {
    await b2.uploadFile('bit/' + filename, await readFile(tmpPath));
    await prisma.bit.create({
      data: {
        artifactId,
        filename: path.basename(filename),
        // notes: notes ?? null,
        date,
        tags: args.t ? ['test video'] : args.q ? ['q+a'] : args.j ? ['journal'] : []
      }
    });
    console.log(`Uploaded bit:${path.basename(filename)}`);
    console.log(`https://media.paperdave.net/bit/${encodeURIComponent(path.basename(filename))}`);
  } else {
    await b2.uploadFile('world/' + filename, await readFile(tmpPath));
    console.log(`Uploaded to world folder:`);
    console.log(`https://media.paperdave.net/world/${encodeURIComponent(path.basename(filename))}`);
  }

  rmSync(tmpPath);
}

prisma.$disconnect();

// copy url to clipboard
// spawnSync('xclip', ['-selection', 'clipboard'], {
//   input: `https://media.paperdave.net/bit/${encodeURIComponent(bit.filename)}`
// });
// process.exit(0);

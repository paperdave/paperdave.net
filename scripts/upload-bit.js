#!/usr/bin/env node
import { copyFileSync, existsSync, rmSync, statSync } from 'fs';
import { PrismaClient } from '@prisma/client';
import minimist from 'minimist';
import path from 'path';
import prompts from 'prompts';
import { spawnSync } from 'child_process';

const prompt = prompts;

const args = minimist(process.argv.slice(2));

if (!args._[0]) {
  console.log('Usage: bit [file] -a <artifact id> -n');
  console.log('  -a to attach to artifact id');
  console.log('  -t to add test video tag');
  console.log('  -n to add notes');
  process.exit(1);
}
const files = args._.map((x) => path.resolve(String(x)));
const notes = args.n;

let missingFiles = false;
for (const file of files) {
  if (!existsSync(file)) {
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

const CDN = '/cdn/bit';

if (!existsSync(CDN)) {
  console.log('CDN not mounted');
  process.exit(1);
}

outer: for (const file of files) {
  const date = args.d ? new Date(args.date) : statSync(file).mtime;

  let cdnPath = path.join(CDN, path.basename(file));
  while (existsSync(cdnPath)) {
    console.log('Artifact with this filename already exists. Enter a new path:');
    const response = await prompt({
      type: 'text',
      name: 'path',
      message: 'Path',
      initial: cdnPath
    });
    if (!response.path) {
      console.log('skipping this one');
      continue outer;
      // let i = 1;
      // while (existsSync(`/cdn/bit/${path.basename(file)}_${i}${path.extname(file)}`)) {
      //   i++;
      // }
      // cdnPath = `/cdn/bit/${path.basename(file)}_${i}${path.extname(file)}`;
      // console.log(`Using ${cdnPath}`);
    }
    const ext = path.extname(response.path);
    cdnPath = response.path;
    if (!cdnPath.endsWith(ext)) {
      cdnPath += ext;
    }
  }

  const ext = path.extname(file);
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
    cdnPath = `${path.dirname(cdnPath)}/${path.basename(cdnPath, ext)}.mp4`;
    const tmpPath = `/tmp/bit-uploader-${Date.now()}.mp4`;

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
    copyFileSync(tmpPath, cdnPath);
    rmSync(tmpPath);
  } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) {
    console.log('Image file detected');
    cdnPath = `${path.dirname(cdnPath)}/${path.basename(cdnPath, ext)}.png`;
    const tmpPath = `/tmp/bit-uploader-${Date.now()}.png`;
    spawnSync('ffmpeg', ['-i', file, '-y', tmpPath]);
    copyFileSync(tmpPath, cdnPath);
    rmSync(tmpPath);
  } else if (['.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a'].includes(ext)) {
    console.log('Audio file detected');
    cdnPath = `${path.dirname(cdnPath)}/${path.basename(cdnPath, ext)}.mp3`;
    const tmpPath = `/tmp/bit-uploader-${Date.now()}.mp3`;
    spawnSync('ffmpeg', ['-i', file, '-c:a', 'libmp3lame', '-q:a', '4', '-y', tmpPath]);
    copyFileSync(tmpPath, cdnPath);
    rmSync(tmpPath);
  } else {
    console.log('Blob file detected');
    copyFileSync(file, cdnPath);
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

  const bit = await prisma.bit.create({
    data: {
      artifactId,
      filename: path.basename(cdnPath),
      // notes: notes ?? null,
      date,
      tags: args.t ? ['test video'] : undefined
    }
  });

  console.log(`Uploaded bit:${bit.filename}`);
  console.log(`https://media.paperdave.net/bit/${encodeURIComponent(bit.filename)}`);
}

prisma.$disconnect();

// copy url to clipboard
// spawnSync('xclip', ['-selection', 'clipboard'], {
//   input: `https://media.paperdave.net/bit/${encodeURIComponent(bit.filename)}`
// });
// process.exit(0);

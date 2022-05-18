import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import { encode } from 'blurhash';
import { lookup } from 'mime-types';
import sharp from 'sharp';

function gcd(a: number, b: number) {
  return b ? gcd(b, a % b) : a;
}

function reduce(numerator: number, denominator: number) {
  const divide = gcd(numerator, denominator);
  return [numerator / divide, denominator / divide];
}

export const post: RequestHandler = async ({ request, url }) => {
  let filename = url.searchParams.get('filename');
  let ext = filename.split('.').pop();

  let data = await request.arrayBuffer();

  let mimetype = lookup(ext);
  if (mimetype?.startsWith('image/')) {
    const buffer = await sharp(new Uint8Array(data))
      .toFormat('webp', {
        lossless: true,
        effort: 6,
        force: true,
      })
      .toBuffer();
    data = new Uint8Array(buffer);
    filename = filename.slice(0, -ext.length) + 'webp';
    ext = 'webp';
    mimetype = 'image/webp';
  }

  const sha256 = await crypto.subtle.digest('SHA-256', data);
  const sha256str = Array.from(new Uint8Array(sha256))
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');

  const half = sha256str.slice(0, 32);
  const subdirectory = half.slice(0, 2);
  const fullpath = `${subdirectory}/${half}.${ext}`;

  const cdn = `https://media.davecode.net/upload/${fullpath}`;

  let blurhash: string | undefined = undefined;
  let width: number | undefined = undefined;
  let height: number | undefined = undefined;
  let ratio: string | undefined = undefined;
  if (mimetype?.startsWith('image/')) {
    const img = sharp(new Uint8Array(data));
    const info = await img.metadata();
    const pixelData = new Uint8ClampedArray(
      await img.raw({ depth: 'char' }).ensureAlpha(1).toBuffer()
    );

    console.log(info.channels);
    console.log(info.width);
    console.log(info.height);

    blurhash = encode(pixelData, info.width, info.height, 4, 3);
    width = info.width;
    height = info.height;

    const [numerator, denominator] = reduce(width, height);
    const a = `${numerator.toString(32)}:${denominator.toString(32)}`;
    let b = `${width / height}`;
    if (b.startsWith('0.')) {
      b = b.slice(1);
    }
    console.log('ratios: ', a, b);
    ratio = a.length <= b.length ? a : b;
  }

  try {
    await db.upload.create({
      data: {
        filename,
        hash: half,
        mimetype,
        date: new Date(),
        blurhash,
        width,
        height,
      },
    });
  } catch (error) {}

  // temp solution
  const uploadRoot = 'M:\\upload';
  const fs = await import('fs');
  if (!fs.existsSync(uploadRoot)) {
    await fs.mkdirSync(uploadRoot);
  }
  if (!fs.existsSync(`${uploadRoot}/${subdirectory}`)) {
    await fs.mkdirSync(`${uploadRoot}/${subdirectory}`);
  }
  await fs.writeFileSync(`${uploadRoot}/${fullpath}`, Buffer.from(data));

  return {
    body: {
      hash: half,
      url: cdn,
      blurhash,
      ratio,
    },
  };
};

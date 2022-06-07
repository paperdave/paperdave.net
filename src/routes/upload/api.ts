import { db } from '$lib/db';
import { are_we_on_localhost_so_idont_have_to_check_auth } from '$lib/env';
import { createMediaId, hashMediaData, type MediaType } from '$lib/utils/media-url';
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
  if (!are_we_on_localhost_so_idont_have_to_check_auth) {
    return {
      body: { error: 'stuff is denied regardless of authentication state rn.' }
    };
  }

  let filename = url.searchParams.get('filename');
  let ext = filename.split('.').pop();

  let data = await request.arrayBuffer();

  const hash = await hashMediaData(data);

  if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'webp') {
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
  }

  let blurhash: string | undefined = undefined;
  let width: number | undefined = undefined;
  let height: number | undefined = undefined;
  let duration: number | undefined = undefined;

  if (ext === 'webp' || ext === 'png' || ext === 'jpeg' || ext === 'avif') {
    const img = sharp(new Uint8Array(data));
    const info = await img.metadata();
    const pixelData = new Uint8ClampedArray(
      await img.raw({ depth: 'char' }).ensureAlpha(1).toBuffer()
    );

    blurhash = encode(pixelData, info.width, info.height, 4, 3);
    width = info.width;
    height = info.height;
  }

  // TODO: duration and aspect ratio of video files.

  const imgId = createMediaId({
    hash,
    type: ext as MediaType,
    width: width,
    height: height,
    blurhash: blurhash,
    duration: duration
  });

  try {
    await db.upload.create({
      data: {
        filename,
        hash: imgId,
        mimetype: ext,
        date: new Date(),
        blurhash,
        width,
        height,
      },
    });
  } catch (error) { }

  // temp solution
  const uploadRoot = 'M:\\upload';
  const fs = await import('fs');

  if (!fs.existsSync(uploadRoot)) {
    await fs.mkdirSync(uploadRoot);
  }

  if (!fs.existsSync(`${uploadRoot}/${hash[0]}`)) {
    await fs.mkdirSync(`${uploadRoot}/${hash[0]}`);
  }

  await fs.writeFileSync(`${uploadRoot}/${hash[0]}/${hash}.${ext}`, Buffer.from(data));

  return {
    body: {
      // TODO: return data
    },
  };
};

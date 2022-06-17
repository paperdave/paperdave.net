import { b2 } from '$lib/b2';
import { db } from '$lib/db';
import { createMediaId, decodeMediaId, hashMediaData, type MediaType } from '$lib/utils/media-id';
import type { RequestHandler } from '@sveltejs/kit';
import { encode } from 'blurhash';
import sharp from 'sharp';
import { lookup } from 'mime-types';

export const post: RequestHandler = async ({ request, url, locals }) => {
  locals.assertAuthorized();

  let filename = url.searchParams.get('filename');
  let modified = parseInt(url.searchParams.get('modified') || '0', 10);
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
        hash,
        type: ext,
        date: new Date(),
        blurhash,
        width,
        height,
      },
    });
  } catch (error) { }

  await b2.uploadFile(process.env.B2_UPLOAD_BUCKET_ID, data, {
    name: `${process.env.B2_UPLOAD_ROOT}/${hash[0]}/${hash}.${ext}`,
    contentType: lookup(ext) || 'application/octet-stream',
    lastModified: modified
  });

  return {
    body: {
      data: imgId
    }
  }
};

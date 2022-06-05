import { db } from '$lib/db';
import type { Video } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ }) => {
  const videos = await db.video.findMany({
    where: {
      unlisted: false,
    },
    orderBy: {
      date: 'desc',
    },
    select: {
      id: true,
      date: true,
      title: true,
      thumb: true,
    },
  });

  return {
    body: {
      videos,
    },
  };
};

export type VideoPartial = Pick<Video, 'id' | 'date' | 'title' | 'thumb'>;

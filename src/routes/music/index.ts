import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  const music = await db.music.findMany({
    where: {
      unlisted: false,
    },
    orderBy: {
      date: 'desc',
    },
  });

  return {
    body: {
      music,
    },
  };
};

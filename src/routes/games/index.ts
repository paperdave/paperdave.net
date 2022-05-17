import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  const games = await db.game.findMany({
    orderBy: {
      date: 'desc',
    },
  });
  return {
    body: {
      games,
    },
  };
};

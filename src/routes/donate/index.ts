import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  const hallOfFame = await db.donator.findMany();

  return {
    body: {
      hallOfFame,
    },
  };
};

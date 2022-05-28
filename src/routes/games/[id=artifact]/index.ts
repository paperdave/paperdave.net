import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
  const game = await db.game.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!game) {
    return {
      status: 404,
    };
  }

  return {
    body: {
      game,
    },
  };
};

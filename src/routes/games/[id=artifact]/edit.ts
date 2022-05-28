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

export const post: RequestHandler = async ({ params, request }) => {
  // TODO: Permissions & other checks.

  const data = await request.json();

  await db.game.update({
    data,
    where: {
      id: params.id,
    },
  });
};

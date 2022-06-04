import { db } from '$lib/db';
import { are_we_on_localhost_so_idont_have_to_check_auth } from '$lib/env';
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
  if(!are_we_on_localhost_so_idont_have_to_check_auth) {
    throw new Error("fadsjdfsjkdfsajkfdsad");
  }

  const data = await request.json();

  await db.game.update({
    data,
    where: {
      id: params.id,
    },
  });
};

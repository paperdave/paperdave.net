import { db } from '$lib/db';
import type { Game } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  const games = await db.game.findMany({
    where: {
      unlisted: false,
    },
    orderBy: {
      date: 'desc',
    },
    select: {
      id: true,
      shortDescription: true,
      date: true,
      banner: true,
      logo: true,
      title: true,
    },
  });

  return {
    body: {
      games,
    },
  };
};

export type GamePartial = Pick<
  Game,
  'id' | 'shortDescription' | 'date' | 'banner' | 'logo' | 'title'
>;

import type { Game } from '@prisma/client/edge';
import { db } from 'src/db.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const games = await db.game.findMany({
    where: {
      unlisted: false
    },
    orderBy: {
      date: 'desc'
    },
    select: {
      id: true,
      shortDescription: true,
      date: true,
      banner: true,
      logo: true,
      title: true
    }
  });
  return {
    games
  };
};

export type GamePartial = Pick<
  Game,
  'id' | 'shortDescription' | 'date' | 'banner' | 'logo' | 'title'
>;

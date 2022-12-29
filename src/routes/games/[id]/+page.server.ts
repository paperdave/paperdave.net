import { db } from 'src/db.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { id } }) => {
  const game = await db.game.findFirst({
    where: {
      id
    }
  });

  if (!game) {
    throw new Error('Game not found');
  }

  return {
    game
  };
};

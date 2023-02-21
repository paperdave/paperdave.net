import { db } from 'src/db.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const story = await db.story.findFirst({
    where: {
      id: params.id,
      date: {
        lte: new Date()
      }
    }
  });

  return {
    story
  };
};

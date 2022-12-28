import { db } from 'src/db.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const featured = await db.artifactEntry.findMany({
    where: {
      featured: true,
      unlisted: false
    },
    select: {
      id: true,
      type: true,
      thumb: true,
      title: true
    },
    orderBy: {
      date: 'desc'
    }
  });

  return {
    featured
  };
};

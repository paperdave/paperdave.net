import { unique } from '@paperdave/utils';
import { db } from 'src/db.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
  const artifacts = await db.video.findMany({
    where: {
      unlisted: false,
      date: {
        lte: new Date()
      }
    },
    select: {
      id: true,
      date: true,
      title: true,
      thumb: true,
      tags: true
    },
    orderBy: {
      date: 'desc'
    }
  });
  const tags = unique(artifacts.flatMap((artifact) => artifact.tags));
  return {
    artifacts,
    tags
  };
};

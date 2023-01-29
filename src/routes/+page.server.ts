import type { ArtifactType } from '@prisma/client';
import { db } from 'src/db.server';
import type { PageServerLoad } from './$types';

const typeToURL: Partial<Record<ArtifactType, string>> = {
  Video: 'videos',
  Music: 'music',
  Game: 'games',
  MusicVideo: 'videos',
  Journal: 'journal',
  Fragment: 'bits'
};
const typeToDisplayType: Partial<Record<ArtifactType, string>> = {
  Video: 'video',
  Music: 'music',
  Game: 'game',
  Journal: 'journal',
  Fragment: 'bit',
  MusicVideo: 'music video'
};

export const load: PageServerLoad = async () => {
  const newArt = await db.artifactEntry.findMany({
    where: {
      featured: true,
      unlisted: false
    },
    select: {
      id: true,
      date: true,
      type: true,
      // thumb: true,
      title: true
    },
    orderBy: {
      date: 'desc'
    }
  });

  return {
    newArt: newArt.map((art) => {
      return {
        url: `/${typeToURL[art.type]}/${art.id}`,
        date: art.date,
        type: typeToDisplayType[art.type] || art.type,
        // thumb: art.thumb,
        title: art.title
      };
    })
  };
};

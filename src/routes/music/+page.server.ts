import { db } from 'src/db.server';
import { groupArraySorted } from 'src/lib/util/array';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const albums = await db.album.findMany({
    where: {
      unlisted: false,
      date: {
        lte: new Date()
      }
    },
    orderBy: {
      date: 'desc'
    },
    select: {
      id: true,
      date: true,
      title: true,
      art: true,
      songs: {
        select: {
          id: true,
          title: true,
          date: true,
          media: true,
          tags: true
        }
      }
    }
  });

  const albumsWithSingle = albums.map((album) => {
    return {
      id: album.id,
      date: album.date,
      title: album.title,
      single: album.songs.length === 1,
      songs: album.songs
    };
  });

  const grouped = groupArraySorted(
    albumsWithSingle,
    (album) => album.date.getFullYear(),
    (a, b) => b - a
  );

  return {
    albums: grouped
  };
};

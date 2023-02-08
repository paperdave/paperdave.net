import { db } from 'src/db.server';
import { groupArraySorted } from 'src/lib/util/array';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const albums = await db.album.findMany({
    where: {
      unlisted: false
      // date: {
      //   lte: new Date()
      // }
    },
    orderBy: {
      date: 'desc'
    },
    select: {
      id: true,
      date: true,
      title: true,
      type: true,
      art: true,
      desc: true,
      songs: {
        select: {
          id: true,
          title: true,
          date: true,
          media: true,
          tags: true,
          instrumental: true,
          order: true,
          duration: true
        }
      }
    }
  });

  const albumsWithSingle = albums.map((album) => {
    return {
      id: album.id,
      date: album.date,
      title: album.title,
      art: album.art,
      type: album.type,
      desc: album.desc,
      songs: album.songs
        .sort((a, b) => a.order - b.order)
        .map((song) => ({
          id: song.id,
          title: song.title,
          date: song.date,
          media: song.media,
          instrumental: song.instrumental,
          tags: song.tags,
          duration: song.duration
        }))
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

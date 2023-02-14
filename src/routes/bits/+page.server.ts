import { db } from 'src/db.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const bits = await db.bit.findMany({
    where: {
      OR: [{ artifactTodo: null }, { artifact: { unlisted: false } }]
    },
    select: {
      artifactId: true,
      filename: true,
      date: true,
      tags: true
    },
    orderBy: { date: 'desc' }
    // take: 250,
  });

  return {
    bits: bits.map(
      (bit) =>
        [
          bit.filename,
          bit.date.getTime(),
          bit.artifactId,
          bit.tags.length ? bit.tags : undefined
        ].filter(Boolean) as [string, number, number?, string[]?]
    )
  };
};

import { db } from 'src/db.server';
import { xml } from 'src/xml';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const sm = xml('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  const artifacts = await db.story.findMany({
    where: {
      unlisted: false
    },
    select: {
      id: true
    },
    orderBy: {
      date: 'desc'
    }
  });

  for (const artifact of artifacts) {
    const url = sm.elem('url');
    url.elem('loc', {}, `https://paperdave.net/stories/${artifact.id}`);
    url.elem('priority', {}, '0.5');
  }

  return sm.response();
};

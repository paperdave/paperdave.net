import { formatDate } from 'src/date';
import { db } from 'src/db.server';
import { xml } from 'src/xml';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const sm = xml('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  const questions = await db.question.findMany({
    where: {
      type: {
        not: 'Reject'
      }
    },
    orderBy: {
      date: 'desc'
    },
    select: {
      date: true
    }
  });

  for (const question of questions) {
    const url = sm.elem('url');
    url.elem('loc', {}, `https://paperdave.net/q+a/${formatDate(question.date, 'question-id')}`);
    url.elem('priority', {}, '0.5');
  }

  return sm.response();
};

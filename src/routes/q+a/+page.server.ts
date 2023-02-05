import { db } from 'src/db.server';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

const MESSAGES_PER_PAGE = 80;

export const load: PageServerLoad = async ({ url }) => {
  const page = url.searchParams.get('page') || 'latest';

  const count = await db.message.count({
    where: {
      type: {
        not: 'REJECT'
      }
    }
  });
  const latest = Math.floor(count / MESSAGES_PER_PAGE);
  const pageNumber = page === 'latest' ? latest : parseInt(page ?? '-1');

  if (pageNumber > latest || pageNumber < 0 || isNaN(pageNumber)) {
    throw error(404, 'Page not found');
  }

  const messages = await db.message.findMany({
    where: {
      type: {
        not: 'REJECT'
      }
    },
    orderBy: {
      date: 'desc'
    },
    select: {
      type: true,
      date: true,
      text: true,
      mentionedArtifacts: {
        select: {
          id: true,
          title: true,
          type: true
        }
      }
    },
    skip: pageNumber * MESSAGES_PER_PAGE,
    take: latest === pageNumber ? MESSAGES_PER_PAGE * 2 : MESSAGES_PER_PAGE
  });

  return {
    id: pageNumber,
    latest: latest === pageNumber,
    messages: messages.map(({ type, text, date, mentionedArtifacts }) => ({
      text,
      date,
      type: type !== 'NORMAL' ? type : undefined,
      artifacts:
        mentionedArtifacts.length > 0
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mentionedArtifacts.reduce<any>((acc, { id, title, type }) => {
              acc[id] = { title, type };
              return acc;
            }, {})
          : undefined
    }))
  };
};

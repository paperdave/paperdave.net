import { db } from '$lib/db';
import type { Message } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import type { MessagePage } from './_lib/utils';

const MESSAGES_PER_PAGE = 80;

export const get: RequestHandler = async ({ url }) => {
  const page = url.searchParams.get('page') || 'latest';

  const count = await db.message.count();
  const latest = Math.floor(count / MESSAGES_PER_PAGE);
  const pageNumber = page === 'latest' ? latest : parseInt(page ?? '-1');

  if (pageNumber > latest || pageNumber < 0 || isNaN(pageNumber)) {
    return {
      status: 404,
    };
  }

  const messages = await db.message.findMany({
    where: {
      type: {
        not: 'REJECT'
      }
    },
    orderBy: {
      date: 'desc',
    },
    select: {
      type: true,
      date: true,
      text: true,
      mentionedArtifacts: {
        select: {
          id: true,
          title: true,
          type: true,
        }
      },
    },
    skip: pageNumber * MESSAGES_PER_PAGE,
    take: latest === pageNumber ? MESSAGES_PER_PAGE * 2 : MESSAGES_PER_PAGE,
  });

  return {
    body: {
      mpage: {
        id: pageNumber,
        latest: latest === pageNumber,
        messages: messages.map(({ type, text, date, mentionedArtifacts }) => ({
          text,
          date,
          type: type !== 'NORMAL' ? type : undefined,
          artifacts: mentionedArtifacts.length > 0 ? mentionedArtifacts.reduce((acc, { id, title, type }) => {
            acc[id] = { title, type };
            return acc;
          }
            , {}) : undefined
        })),
      } as MessagePage,
    },
  };
};

import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import type { MessagePage } from './_types';

const MESSAGES_PER_PAGE = 80;

export const get: RequestHandler = async ({ url }) => {
  const page = parseInt(url.searchParams.get('page') || '1');

  if (isNaN(page)) {
    return {
      body: {
        error: 'invalid_page',
        mpage: null,
      },
    };
  }

  const messages = await db.message.findMany({});

  return {
    body: {
      mpage: {
        id: 0,
        latest: true,
        messages: messages,
      } as MessagePage,
    },
  };
};

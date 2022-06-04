import { db } from '$lib/db';
import { are_we_on_localhost_so_idont_have_to_check_auth } from '$lib/env';
import type { Message } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import type { MessagePage } from './_lib/utils';

export const get: RequestHandler = async () => {
  if (!are_we_on_localhost_so_idont_have_to_check_auth) {
    return {
      status: 401,
    };
  }

  const messages = await db.messageInput.findMany({});
  return {
    body: {
      messages
    }
  }
};

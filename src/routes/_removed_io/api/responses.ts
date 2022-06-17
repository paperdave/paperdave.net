import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
  locals.assertAuthorized();

  const messages = await db.messageInput.findMany({});
  return {
    body: messages,
  };
};
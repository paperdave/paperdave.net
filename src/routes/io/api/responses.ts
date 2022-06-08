import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    return {
      status: 401,
    };
  }

  const messages = await db.messageInput.findMany({});
  return {
    body: messages,
  };
};
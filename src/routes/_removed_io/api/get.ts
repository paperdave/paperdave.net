import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import { parseMessageDateID } from '../_lib/utils';

export const get: RequestHandler = async ({ locals, url }) => {
  locals.assertAuthorized();
  const id = url.searchParams.get('id');
  const date = parseMessageDateID(id);
  const find = await db.message.findFirst({
    where: {
      date,
    }
  });
  return { body: find ?? null };
};
import { json } from '@sveltejs/kit';
import { db } from 'src/db.server';
import { assertAuthorized } from '../../_lib/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  assertAuthorized();
  const messages = await db.messageInput.findMany({});
  return json(messages);
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from 'src/db.server';
import { assertAuthorized } from '../../_lib/auth';

export const POST: RequestHandler = async ({ request }) => {
  assertAuthorized();

  const body = await request.json();
  body.date = new Date(body.date);

  await db.message.delete({
    where: {
      date: body.date
    }
  });

  return json({ ok: true });
};

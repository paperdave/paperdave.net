import { db } from "$lib/db";
import type { RequestHandler } from "@sveltejs/kit"

export const post: RequestHandler = async ({ request, locals }) => {
  locals.assertAuthorized();

  const body = await request.json();
  body.date = new Date(body.date);

  await db.message.delete({
    where: {
      date: body.date,
    },
  });

  return {
    body: { ok: true },
  }
}
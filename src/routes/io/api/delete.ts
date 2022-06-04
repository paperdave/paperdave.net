import { db } from "$lib/db";
import { are_we_on_localhost_so_idont_have_to_check_auth } from "$lib/env"
import type { RequestHandler } from "@sveltejs/kit"

export const post: RequestHandler = async ({ request }) => {
  if (!are_we_on_localhost_so_idont_have_to_check_auth) {
    return {
      status: 401,
    };
  }

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
import { db } from "$lib/db";
import type { RequestHandler } from "@sveltejs/kit";
import { parseMessageDateID } from "../_lib/utils";

export const get: RequestHandler = async ({ params }) => {
  const date = parseMessageDateID(params.id);
  if (!date) return {
    status: 404
  };
  const find = await db.message.findFirst({
    where: {
      date,
    }
  });
  if (!find) return {
    status: 404
  };
  return { body: { message: find } };
}
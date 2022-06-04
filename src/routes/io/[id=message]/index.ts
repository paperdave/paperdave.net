import { db } from "$lib/db";
import type { RequestHandler } from "@sveltejs/kit";
import { parseMessageDateID } from "../_lib/utils";

export const get: RequestHandler = async ({ params }) => {
  const date = parseMessageDateID(params.id);
  if (!date) return { body: { message: null, isPending: false } };
  const find = await db.message.findFirst({
    where: {
      date,
    },
    include: {
      mentionedArtifacts: true,
      mentionedMessages: true,
    }
  });
  if (!find) {
    const find2 = await db.messageInput.findFirst({
      where: {
        date
      }
    });
    if (find2) {
      return { body: { message: {}, isPending: true } };
    }
  }
  return { body: { message: find, isPending: false } };
}
import { db } from "$lib/db";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ params }) => {
  const id = params.id;
  const artifact = await db.artifactEntry.findFirst({
    where: {
      id,
    },
    select: {
      title: true,
      type: true,
    }
  });
  return {
    status: artifact ? 200 : 404,
    body: artifact ? artifact : undefined,
  }
}
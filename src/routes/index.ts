import { db } from "$lib/db";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
  const featured = await db.artifactEntry.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      date: 'desc'
    }
  });

  return {
    body: {
      featured,
    }
  }
}
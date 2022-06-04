import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

interface Params extends Record<string, string> {
  id: string;
}

export const get: RequestHandler<Params> = async ({ params }) => {
  const artifact = await db.video.findFirst({
    where: {
      id: params.id,
    },
  });

  return {
    body: {
      artifact,
    },
  };
};

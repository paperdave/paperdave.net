import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

interface Params extends Record<string, string> {
  id: string;
}

export const get: RequestHandler<Params> = async ({ params }) => {
  const story = await db.story.findFirst({
    where: {
      id: params.id,
    },
  });

  return {
    body: {
      story,
    },
  };
};

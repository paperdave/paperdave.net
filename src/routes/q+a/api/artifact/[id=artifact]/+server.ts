import { error, json, type RequestHandler } from '@sveltejs/kit';
import { db } from 'src/db.server';

export const GET: RequestHandler = async ({ params }) => {
  const id = params.id;
  const artifact = await db.artifactEntry.findFirst({
    where: {
      id
    },
    select: {
      title: true,
      type: true
    }
  });
  if (!artifact) {
    throw error(404, 'Not found');
  }
  return json(artifact);
};

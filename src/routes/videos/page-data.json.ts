import { getDB } from '$lib/db';
import { Artifact } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  const artifactDb = await getDB(Artifact);

  const artifacts = await artifactDb.find({ type: 'video' }).toArray();

  return {
    body: artifacts
      .map((a) => Artifact.fromJSON(a))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((a) => a.toJSON()),
  };
};

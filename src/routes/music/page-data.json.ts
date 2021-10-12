import { getDatabase } from '$lib/db';
import { Artifact } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  const artifacts = await getDatabase(Artifact);

  const find = await artifacts.find({ type: 'music' }).toArray();

  return {
    body: find
      .map((x) => Artifact.fromJSON(x))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((x) => x.toJSON()),
  };
};

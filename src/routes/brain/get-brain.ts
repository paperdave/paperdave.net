import { getDatabase } from '$lib/db';
import { BrainPost } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  const artifacts = await getDatabase(BrainPost);

  const find = await artifacts.find({}).toArray();

  return {
    body: find
      .map((x) => BrainPost.fromJSON(x))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((x) => x.toJSON()),
  };
};

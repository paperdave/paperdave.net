import { RequestHandler } from '@sveltejs/kit';
import { Artifact } from '$lib/db';

export const get: RequestHandler = async ({}) => {
  const artifacts = await Artifact.find({ type: 'music' });

  return {
    body: artifacts.sort((a, b) => b.date.getTime() - a.date.getTime()),
  };
};

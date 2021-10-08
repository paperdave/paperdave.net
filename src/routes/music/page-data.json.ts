import { Artifact, connect } from '$lib/db';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  await connect();

  const artifacts = await Artifact.find({ type: 'music' });

  return {
    body: artifacts
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((item) => {
        return {
          id: item.id,
          title: item.title,
          date: item.date.toISOString(),
          type: item.type,
          tags: item.tags,
          thumbnail: item.thumbnail,
          data: Object.fromEntries([...item.data.entries()]),
        };
      }),
  };
};

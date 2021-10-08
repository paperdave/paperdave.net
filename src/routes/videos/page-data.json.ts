import { RequestHandler } from '@sveltejs/kit';
import { Artifact } from '$lib/db';

export const get: RequestHandler = async ({}) => {
  const artifacts = await Artifact.find({ type: 'video' });

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

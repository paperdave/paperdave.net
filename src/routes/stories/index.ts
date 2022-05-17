import { getDatabase } from '$lib/db';
import { Artifact, ArtifactType } from '$lib/structures';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  const artifacts = await getDatabase(Artifact);
  const stories = await artifacts.find({ type: ArtifactType.STORY });

  console.log(stories);

  return {
    body: {
      stories: stories,
    },
  };
};

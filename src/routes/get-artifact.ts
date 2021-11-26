import { getDatabase } from '$lib/db';
import { Artifact, ArtifactVisibility } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ query }) => {
  const db = await getDatabase(Artifact);
  const id = query.get('id') ?? '';
  const find = await db.findOne({ id });
  if (!find) {
    return {
      status: 404,
      body: { error: 'Artifact not found' },
    };
  }

  const artifact = Artifact.fromJSON(find);
  if (
    artifact.visibility !== ArtifactVisibility.PUBLIC &&
    artifact.visibility !== ArtifactVisibility.UNLISTED
  ) {
    return {
      status: 404,
      body: { error: 'Artifact not found' },
    };
  }

  return {
    status: 200,
    body: artifact.toJSON(),
  };
};

import { getDatabase } from '$lib/db';
import { Artifact, ArtifactVisibility, UserPermission } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
  const user = locals.session.data?.user;

  if (!user || !user.permissions.includes(UserPermission.CREATE_ARTIFACTS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to query this endpoint.',
      },
    };
  }

  const id = 'new-artifact-' + Math.random().toString(36).substring(7);

  const artifact = new Artifact();
  artifact.id = id;
  artifact.title = 'New Artifact';
  artifact.visibility = ArtifactVisibility.DRAFT;

  const db = await getDatabase(Artifact);

  await db.insertOne(artifact.toJSON());

  return {
    body: {
      id,
    },
  };
};

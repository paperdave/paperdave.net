import { getDatabase } from '$lib/db';
import { Artifact, JSONData, UserPermission } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ locals, body }) => {
  const user = locals.session.data?.user;

  if (!user || !user.permissions.includes(UserPermission.CREATE_ARTIFACTS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to query this endpoint.',
      },
    };
  }

  const id = body.id as string;
  const artifact = body.artifact as JSONData<Artifact>;

  const db = await getDatabase(Artifact);

  await db.findOneAndReplace({ id }, Artifact.fromJSON(artifact).toJSON());

  return {
    body: {
      ok: true,
    },
  };
};

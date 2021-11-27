import { getDatabase } from '$lib/db';
import { Artifact, Permission } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ locals, body }) => {
  const user = locals.session.data?.user;

  if (!user || !user.permissions.includes(Permission.CREATE_ARTIFACTS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to query this endpoint.',
      },
    };
  }

  const id = body.id as string;

  const db = await getDatabase(Artifact);

  await db.deleteOne({ id });

  return {
    body: {
      ok: true,
    },
  };
};

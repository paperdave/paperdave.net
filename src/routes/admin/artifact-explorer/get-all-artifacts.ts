import { getDatabase, stripDatabaseInternals } from '$lib/db';
import { Artifact, Permission } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
  const user = locals.session.data?.user;

  if (!user || !user.permissions.includes(Permission.VIEW_ARTIFACTS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to query this endpoint.',
      },
    };
  }

  const db = await getDatabase(Artifact);

  const requests = await db.find({}).toArray();

  return {
    body: stripDatabaseInternals(
      requests
        .map((x) => Artifact.fromJSON(x))
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((x) => x.toJSON())
    ),
  };
};

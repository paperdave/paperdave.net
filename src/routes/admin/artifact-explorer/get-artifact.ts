import { getDatabase, stripDatabaseInternals } from '$lib/db';
import { Artifact, UserPermission } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals, query }) => {
  const user = locals.session.data?.user;

  if (!user || !user.permissions.includes(UserPermission.VIEW_ARTIFACTS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to query this endpoint.',
      },
    };
  }

  const db = await getDatabase(Artifact);

  const id = query.get('id');

  if (!id) {
    return {
      status: 400,
      body: {
        error: 'No id provided.',
      },
    };
  }

  const response = await db.find({ id }).limit(1).toArray();

  if (response.length === 0) {
    return {
      status: 404,
      body: {
        error: 'No artifact found with that id.',
      },
    };
  }

  return {
    body: stripDatabaseInternals(Artifact.fromJSON(response[0]).toJSON()),
  };
};

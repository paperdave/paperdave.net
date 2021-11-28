import { getDatabase, stripDatabaseInternals } from '$lib/db';
import { Artifact, JSONData, Permission } from '$lib/structures';
import { APIHandler } from '$lib/utils/api';

export const get: APIHandler<void, JSONData<Artifact>[]> = async ({ locals }) => {
  if (!locals.session.refreshAndCheckPermission(Permission.VIEW_ARTIFACTS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to list all artifacts.',
      },
    };
  }

  const db = await getDatabase(Artifact);

  const requests = await db.find({}).toArray();

  return {
    body: stripDatabaseInternals(requests.map((x) => Artifact.fromJSON(x).toJSON())),
  };
};

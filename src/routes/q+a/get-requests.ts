import { getDatabase, stripDatabaseInternals } from '$lib/db';
import { Permission, QuestionRequest } from '$lib/structures';
import { APIHandler } from '$lib/utils/api';

export const get: APIHandler<void, any> = async ({ locals }) => {
  if (!locals.user.queryPermission(Permission.RESPOND_TO_QUESTIONS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to query this endpoint.',
      },
    };
  }

  const db = await getDatabase(QuestionRequest);

  const requests = await db.find({}).toArray();

  return {
    body: stripDatabaseInternals(requests),
  };
};

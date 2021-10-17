import { getDatabase, stripDatabaseInternals } from '$lib/db';
import { QuestionRequest, UserPermission } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
  const user = locals.session.data?.user;

  if (!user || !user.permissions.includes(UserPermission.RESPOND_TO_QUESTIONS)) {
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

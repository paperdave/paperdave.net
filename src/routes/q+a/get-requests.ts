import { getDatabase, stripDatabaseInternals } from '$lib/db';
import { Permission, QuestionRequest } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
  const user = locals.session.data?.user;

  if (!user || !user.permissions.includes(Permission.RESPOND_TO_QUESTIONS)) {
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

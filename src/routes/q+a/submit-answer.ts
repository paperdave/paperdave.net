import { getDatabase } from '$lib/db';
import { Question, QuestionRequest, UserPermission } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ locals, body }) => {
  const user = locals.session.data?.user;

  if (!user || !user.permissions.includes(UserPermission.RESPOND_TO_QUESTIONS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to query this endpoint.',
      },
    };
  }

  const date: number = body.date;

  const requestDb = await getDatabase(QuestionRequest);

  requestDb.deleteOne({ date: { $eq: date } });

  const question = body.result ? Question.fromJSON(body.result) : null;

  if (question) {
    const qdb = await getDatabase(Question);
    await qdb.insertOne(question.toJSON());
  }

  return {
    body: { ok: true },
  };
};

import { getDatabase } from '$lib/db';
import { Question, QuestionRequest } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ body }) => {
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

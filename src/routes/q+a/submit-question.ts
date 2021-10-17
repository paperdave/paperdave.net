import { getDatabase } from '$lib/db';
import { JSONData, Question, QuestionRequest } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ body }) => {
  const q = QuestionRequest.fromJSON(body as unknown as JSONData<QuestionRequest>);

  q.setDate(new Date());

  const dateId = new Question().setDate(q.date).getDateId();

  const db = await getDatabase(QuestionRequest);
  await db.insertOne(q.toJSON());

  return {
    body: {
      dateId,
      success: true,
    },
  };
};

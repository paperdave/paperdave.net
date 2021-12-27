import { getDatabase } from '$lib/db';
import { JSONData, Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

/** Retrives a random question's URL. */
export const get: RequestHandler = async () => {
  const db = await getDatabase(Question);
  const q = await db.aggregate([{ $sample: { size: 1 } }]).toArray();
  const question = Question.fromJSON(q[0] as JSONData<Question>);

  return {
    status: 200,
    body: {
      url: `/q+a/${question.getDateId()}`,
    },
  };
};

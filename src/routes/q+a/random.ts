import { getDatabase } from '$lib/db';
import { JSONData, Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const db = await getDatabase(Question);
  const q = await db.aggregate([{ $sample: { size: 1 } }]).toArray();
  const question = Question.fromJSON(q[0] as JSONData<Question>);

  return {
    status: 302,
    headers: {
      Location: `/q+a/${question.getDateId()}`,
    },
  };
};

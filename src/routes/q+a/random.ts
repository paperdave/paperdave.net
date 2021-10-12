import { getDB } from '$lib/db';
import { Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  const questionDb = await getDB(Question);

  const q = await questionDb.aggregate([{ $sample: { size: 1 } }]).toArray();

  const question = Question.fromJSON(q[0]);

  return {
    status: 302,
    headers: {
      Location: `/q+a/${question.getDateId()}`,
    },
  };
};

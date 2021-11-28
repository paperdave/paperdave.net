import { getDatabase } from '$lib/db';
import { JSONData, Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  const questionDb = await getDatabase(Question);

  const q = (await questionDb
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()) as JSONData<Question>[];

  const question = Question.fromJSON(q[0]);

  return {
    status: 302,
    headers: {
      Location: `/q+a/${question.getDateId()}`,
    },
  };
};

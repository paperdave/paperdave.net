import { getDatabase } from '$lib/db';
import { Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

/** Retrives a random question's URL. */
export const get: RequestHandler = async ({ url }) => {
  const db = await getDatabase(Question);
  // I did not implement WrappedCollection.aggregate() so we use the raw collection from mongo
  const q = await db.raw.aggregate([{ $sample: { size: 1 } }]);
  const question = Question.fromJSON(q[0]);

  return {
    status: 200,
    body: {
      url: question.getURL(url.origin).pathname,
    },
  };
};

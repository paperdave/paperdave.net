import { getDatabase } from '$lib/db';
import { JSONData, Question } from '$lib/structures';
import { GetAPIHandler } from '$lib/utils/api';

const SEARCH_LIMIT = 10;

/**
 * Searches the question database.
 *
 * - A query parameter of "q" must be provided, with the search query.
 */
export const get: GetAPIHandler<JSONData<Question>[]> = async ({ query }) => {
  const db = await getDatabase(Question);

  const search = query.get('q') ?? '';

  const questions = await db
    .aggregate([
      {
        $search: {
          index: 'default',
          text: {
            query: search,
            path: {
              wildcard: '*',
            },
          },
        },
      },
      {
        $limit: 20,
      },
    ])
    .limit(SEARCH_LIMIT)
    .toArray();

  return {
    status: 200,
    body: questions.map((x) => Question.fromJSON(x as JSONData<Question>).toJSON()),
  };
};

import { getDatabase } from '$lib/db';
import { JSONData, Question } from '$lib/structures';
import { QuestionPage } from '$lib/structures/QuestionPage';
import { GetAPIHandler } from '$lib/utils/api';

const SEARCH_LIMIT = 20;

/**
 * Searches the question database.
 *
 * - A query parameter of "q" must be provided, with the search query.
 */
export const get: GetAPIHandler<QuestionPage> = async ({ query }) => {
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
    body: QuestionPage.fromJSON({
      id: -1,
      questions: questions as JSONData<Question>[],
      latest: false,
    }).toJSON(),
  };
};

import { StructureJSON } from '$lib/api-client/api-shared';
import { getDatabase } from '$lib/db';
import { Question, QuestionPage } from '$lib/structures';
import { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

const SEARCH_LIMIT = 20;

/**
 * Searches the question database.
 *
 * - A query parameter of "q" must be provided, with the search query.
 */
export const get: RequestHandler = async ({ url }) => {
  const db = await getDatabase(Question);

  const search = url.searchParams.get('q') ?? '';

  const questions = await db.raw.aggregate([
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
      $limit: SEARCH_LIMIT,
    },
  ]);

  return {
    status: 200,
    body: new QuestionPage({
      id: -1,
      questions: questions.map((q: StructureJSON) => Question.fromJSON(q)),
      latest: false,
    }).toJSON(),
  } as RequestHandlerOutput;
};

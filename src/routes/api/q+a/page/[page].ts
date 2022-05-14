import { StructureJSON } from '$lib/api-client/api-shared';
import { getDatabase } from '$lib/db';
import { Question, QuestionPage } from '$lib/structures';
import { Dict } from '@davecode/structures/dist/helper-types';
import { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

interface Params extends Dict<string> {
  page: string;
}

export const PAGE_SIZE = 100;

/**
 * Returns a QuestionPage
 *
 * - The desired page must be passed through the `page` url parameter.
 * - If the page number "latest" is passed, the latest page is returned.
 * - If the page does not exist, a 404 is returned.
 */
export const get: RequestHandler<Params> = async ({ params }) => {
  const questionDB = await getDatabase(Question);

  const count = await questionDB.count();
  const latest = Math.floor(count / PAGE_SIZE) - 1;
  const pageNumber = params.page === 'latest' ? latest : parseInt(params.page ?? '-1');

  if (pageNumber > latest || pageNumber < 0 || isNaN(pageNumber)) {
    return {
      status: 404,
      body: {
        error: 'Page does not exist.',
      },
    };
  }

  const questions = await questionDB.raw.aggregate([
    {
      $match: { content: { $exists: true, $ne: [] } },
    },
    {
      $sort: {
        date: 1,
      },
    },
    {
      $skip: pageNumber * PAGE_SIZE,
    },
    {
      $limit: latest === pageNumber ? PAGE_SIZE * 2 : PAGE_SIZE,
    },
  ]);

  const page = QuestionPage.fromJSON({
    id: pageNumber,
    questions: questions.reverse().map((x: StructureJSON) => Question.fromJSON(x).toJSON()),
    latest: latest === pageNumber,
  });

  return {
    body: page.toJSON(),
  } as RequestHandlerOutput;
};

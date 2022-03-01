import { StructureJSON } from '$lib/api-client/api-shared';
import { getDatabase } from '$lib/db';
import { Question, QuestionPage } from '$lib/structures';
import { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

interface Params {
  page: string;
}

export const PAGE_SIZE = 20;

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

  // const questions = await questionDB.raw
  //   .find({ date: { "$gt":  } })
  //   .limit(latest === pageNumber ? PAGE_SIZE * 2 : PAGE_SIZE)
  //   .skip(pageNumber * PAGE_SIZE)
  //   .toArray();

  const questions = await questionDB.raw.aggregate([
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

import { getDatabase } from '$lib/db';
import { Question } from '$lib/structures';
import { QuestionPage } from '$lib/structures/QuestionPage';
import { GetAPIHandler } from '$lib/utils/api';

/**
 * Returns a QuestionPage
 *
 * - The desired page must be passed through the `page` url parameter.
 * - If the page number "latest" is passed, the latest page is returned.
 * - If the page does not exist, a 404 is returned.
 */
export const get: GetAPIHandler<QuestionPage> = async ({ params }) => {
  const questionDB = await getDatabase(Question);

  const count = await questionDB.countDocuments();
  const latest = Math.floor(count / QuestionPage.SIZE) - 1;
  const pageNumber = params.page === 'latest' ? latest : parseInt(params.page ?? '-1');

  if (pageNumber > latest || pageNumber < 0 || isNaN(pageNumber)) {
    return {
      status: 404,
      body: {
        error: 'Page does not exist.',
      },
    };
  }

  const questions = await questionDB
    .find({})
    .sort({ date: 1 })
    .limit(latest === pageNumber ? QuestionPage.SIZE * 2 : QuestionPage.SIZE)
    .skip(pageNumber * QuestionPage.SIZE)
    .toArray();

  const page = QuestionPage.fromJSON({
    id: pageNumber,
    questions: questions.reverse().map((x) => Question.fromJSON(x).toJSON()),
    latest: latest === pageNumber,
  });

  return {
    body: page.toJSON(),
  };
};

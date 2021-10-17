import { getDatabase, stripDatabaseInternals } from '$lib/db';
import { Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

const PAGE_SIZE = 25;

export const get: RequestHandler = async ({ query }) => {
  const questionDB = await getDatabase(Question);

  const count = await questionDB.countDocuments();
  const lastPage = Math.floor(count / PAGE_SIZE) - 1;
  const pageNumber = parseInt(query.get('page') ?? '0');

  if (pageNumber >= lastPage) {
    return {
      body: {
        tooNew: true,
        page: lastPage,
        questions: [],
      },
    };
  }

  const questions = await questionDB
    .find({})
    .sort({ date: 1, d: 1 })
    .skip(pageNumber * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .toArray();

  return {
    body: {
      tooNew: null,
      page: pageNumber,
      questions: stripDatabaseInternals(questions.reverse()),
    },
  };
};

import { getDB } from '$lib/db';
import { Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

const PAGE_SIZE = 25;

export const get: RequestHandler = async ({}) => {
  const questionDB = await getDB(Question);

  const count = await questionDB.countDocuments();

  const pageNumber = Math.floor(count / PAGE_SIZE) - 1;

  const questions = await questionDB
    .find({})
    .sort({ date: 1, d: 1 })
    .limit(PAGE_SIZE * 2)
    .skip(pageNumber * PAGE_SIZE)
    .toArray();

  return {
    body: {
      page: pageNumber,
      questions: questions.reverse(),
    },
  };
};

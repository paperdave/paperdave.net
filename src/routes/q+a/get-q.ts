import { getDatabase, stripDatabaseInternals } from '$lib/db';
import { Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ query }) => {
  const questionDb = await getDatabase(Question);

  const questionDateId = query.get('id');

  if (!questionDateId) {
    return {
      status: 400,
      body: {
        question: null,
      },
    };
  }

  const match = Question.parseDateId(questionDateId);
  if (!match) {
    return {
      status: 400,
      body: {
        question: null,
      },
    };
  }

  const question = await questionDb.findOne({
    date: { $eq: match.getTime() },
  });

  return {
    body: {
      question: stripDatabaseInternals(question),
    },
  };
};

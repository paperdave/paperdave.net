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
        error: 'Missing question id',
      },
    };
  }

  const match = questionDateId.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (!match) {
    return {
      status: 400,
      body: {
        error: 'Invalid question id',
      },
    };
  }
  const [_, year, month, day, hour, minute, second] = match;

  const questionDate = new Date(
    2000 + parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second)
  ).getTime();

  const question = await questionDb.findOne({
    date: { $eq: questionDate },
  });

  return {
    body: {
      question: stripDatabaseInternals(question),
    },
  };
};

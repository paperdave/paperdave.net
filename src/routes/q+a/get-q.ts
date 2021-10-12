import { databaseReady, QuestionModel } from '$lib/db';
import { Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ query }) => {
  await databaseReady();

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
  );

  const question = await QuestionModel.findOne({});

  return {
    body: {
      question: question ? Question.fromJSON(JSON.parse(JSON.stringify(question))).toJSON() : null,
    },
  };
};

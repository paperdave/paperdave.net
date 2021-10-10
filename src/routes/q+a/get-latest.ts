import { databaseReady, QuestionModel } from '$lib/db';
import { Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  await databaseReady();

  const questions = await QuestionModel.find({}).sort({ date: -1, d: -1 }).limit(10).exec();

  return {
    body: {
      questions: questions.map((q) => new Question(JSON.parse(JSON.stringify(q))).toJSON()) as any,
    },
  };
};

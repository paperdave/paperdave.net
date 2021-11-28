import { getDatabase } from '$lib/db';
import { JSONData, Permission, Question, QuestionRequest } from '$lib/structures';
import { APIHandler, GenericSuccess } from '$lib/utils/api';

export interface SubmitAnswerInput {
  date: number;
  result: JSONData<Question>;
}

export const post: APIHandler<SubmitAnswerInput, GenericSuccess> = async ({ locals, body }) => {
  if (!locals.session.refreshAndCheckPermission(Permission.RESPOND_TO_QUESTIONS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to respond to questions.',
      },
    };
  }

  const requestDb = await getDatabase(QuestionRequest);
  requestDb.deleteOne({ date: { $eq: body.date } });

  const question = body.result ? Question.fromJSON(body.result) : null;
  if (question) {
    const qdb = await getDatabase(Question);
    await qdb.insertOne(question.toJSON());
  }

  return {
    body: {
      success: true,
    },
  };
};

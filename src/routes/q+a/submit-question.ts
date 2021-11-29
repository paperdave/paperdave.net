import { getDatabase } from '$lib/db';
import { JSONData, Question, QuestionRequest } from '$lib/structures';
import { APIHandler } from '$lib/utils/api';

export interface SubmitQuestionSuccess {
  dateId: string;
}

export const post: APIHandler<QuestionRequest, SubmitQuestionSuccess> = async ({ body }) => {
  const q = QuestionRequest.fromJSON(body as unknown as JSONData<QuestionRequest>);

  q.setDate(new Date());

  const dateId = new Question().setDate(q.date).getDateId();

  const db = await getDatabase(QuestionRequest);
  await db.insertOne(q.toJSON());

  return {
    body: {
      dateId,
    },
  };
};

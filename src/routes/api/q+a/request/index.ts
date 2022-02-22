import { getDatabase } from '$lib/db';
import { Permission, QuestionRequest } from '$lib/structures';
import { APIHandler, GenericSuccess, GetAPIHandler } from '$lib/utils/api';

/** Returns all question requests */
export const get: GetAPIHandler<QuestionRequest[]> = async ({ locals }) => {
  if (!locals.user.queryPermission(Permission.RESPOND_TO_QUESTIONS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to view question requests',
      },
    };
  }

  const db = await getDatabase(QuestionRequest);
  const requests = await db.find().toArray();

  return {
    status: 200,
    body: requests.map((r) => QuestionRequest.fromJSON(r).toJSON()),
  };
};

export interface QuestionSubmitSuccess extends GenericSuccess {
  id: string;
}

/**
 * Creates a new question request.
 *
 * - Does not require any permissions.
 * - The date is automatically set to the current date, and will be overwritten.
 */
export const post: APIHandler<QuestionRequest, QuestionSubmitSuccess> = async ({ body, headers }) => {
  const request = QuestionRequest.fromJSON(body);
  request.date = new Date();
  request.ipAddress = JSON.stringify(headers);

  const db = await getDatabase(QuestionRequest);

  while (await db.findOne({ date: request.date })) {
    request.date.setTime(request.date.getTime() + 1000);
  }

  await db.insertOne(request.toJSON());

  return {
    status: 200,
    body: {
      success: true,
      id: request.getDateId(),
    },
  };
};

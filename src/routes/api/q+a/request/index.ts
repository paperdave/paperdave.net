import { getDatabase } from '$lib/db';
import { QA_BLOCKED_IPS } from '$lib/env';
import { Permission, QuestionRequest } from '$lib/structures';
import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

/** Returns all question requests */
export const get: RequestHandler = async ({ locals }) => {
  console.log(locals.user);

  if (!locals.user.queryPermission(Permission.RESPOND_TO_QUESTIONS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to view question requests',
      },
    };
  }

  const db = await getDatabase(QuestionRequest);
  const requests = await db.find();

  return {
    status: 200,
    body: requests.map((r) => r.toJSON()),
  } as RequestHandlerOutput;
};

/**
 * Creates a new question request.
 *
 * - Does not require any permissions.
 * - The date is automatically set to the current date, and will be overwritten.
 */
export const post: RequestHandler = async ({ request }) => {
  const qr = QuestionRequest.fromJSON(await request.json());
  qr.date = new Date(Math.floor(new Date().getTime() / 1000) * 1000);

  if (qr.content.length < 1) {
    return {
      status: 400,
      body: {
        error: 'Question request content must be at least 1 character long',
      },
    };
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp && QA_BLOCKED_IPS.includes(cfConnectingIp)) {
    return {
      status: 403,
      body: {
        error: 'Unknown Error',
      },
    };
  }

  // TODO: move to the new tracking system i want to use
  // - vpn provider
  // - country
  // - a name from `unique-names-generator` or something with ip and other data as a seed

  qr.ipAddress = cfConnectingIp;

  const db = await getDatabase(QuestionRequest);

  while (await db.findOne({ date: qr.date })) {
    qr.date.setTime(qr.date.getTime() + 1000);
  }

  await db.insertOne(qr);

  return {
    status: 200,
    body: {
      success: true,
      id: qr.getDateId(),
    },
  };
};

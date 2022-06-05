import { db } from "$lib/db"
import { getMessageDateID } from "./_lib/utils";

export const get = async ({ request }) => {
  const accept = request.headers.get("accept");

  const count = await db.message.count({
    where: {
      type: 'NORMAL',
    }
  });

  const msg = await db.message.findFirst({
    skip: Math.floor(Math.random() * count),
    take: 1,
    select: {
      date: true
    },
    where: {
      type: 'NORMAL',
    }
  });

  return accept === 'text/plain' ? {
    status: 200,
    body: `/io/${getMessageDateID(msg)}`,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  } : {
    status: 302,
    headers: {
      Location: `/io/${getMessageDateID(msg)}`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
  }
}
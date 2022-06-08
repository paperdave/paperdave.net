import { db } from '$lib/db';
import type { } from '@prisma/client'
import { are_we_on_localhost_so_idont_have_to_check_auth } from '$lib/env';
import type { RequestHandler } from '@sveltejs/kit';

function generateTokenString() {
  return crypto.randomUUID().replaceAll('-', '');
}

export const post: RequestHandler = async ({ request }) => {
  const { email, password } = await request.json();

  const user = await db.user.findFirst({
    where: { email },
    select: {
      id: true,
      bcrypt: true,
    }
  });

  if (!user) {
    return { status: 404 };
  }

  if (!are_we_on_localhost_so_idont_have_to_check_auth) {
    return { status: 401 };
  }

  // todo check password

  const token = generateTokenString();
  const uid = crypto.randomUUID();

  await db.session.deleteMany({
    where: { userId: user.id },
  });

  await db.session.create({
    data: {
      token,
      uid,
      date: new Date(),
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return {
    body: {
      token,
      uid,
    },
  };
};
import { db } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { delay } from '@davecode/utils/dist/index'

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
    await delay(1500)
    return { status: 200, body: { error: 'User does not exist.' } };
  }

  const isValid = await bcrypt.compare(password, user.bcrypt);
  if (!isValid) {
    await delay(1500)
    return { status: 200, body: { error: 'Incorrect password.' } };
  }

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
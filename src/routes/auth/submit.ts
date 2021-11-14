import { getDatabase } from '$lib/db';
import { ISession } from '$lib/structures/Session';
import { User } from '$lib/structures/User';
import { RequestHandler } from '@sveltejs/kit';
import crypto from 'crypto';

// note: move to bcrypt for passwords. but i dont care since it's literally one user account LOL.

export const post: RequestHandler<Record<string, unknown>, FormData> = async ({ body, locals }) => {
  const submitType = body.get('type')?.toString();

  const userDb = await getDatabase(User);

  if (submitType === 'login') {
    const email = body.get('email')?.toString().toLowerCase();
    const password = body.get('password')?.toString();

    const one = await userDb.findOne({ email });

    if (one) {
      const user = User.fromJSON(one);
      const hashed = crypto
        .createHash('sha256')
        .update(`${one.salt}_${email}_${password}`)
        .digest('hex');
      if (user.passwordHash === hashed) {
        const userData = user.getClientUser();
        locals.session.data = {
          user: userData,
        } as ISession;
        return {
          status: 200,
          body: {
            success: true,
            userData,
          },
        };
      } else {
        return {
          status: 200,
          body: {
            success: false,
            message: 'Invalid email or password',
          },
        };
      }
    } else {
      return {
        status: 200,
        body: {
          success: false,
          message: 'Invalid email or password',
        },
      };
    }
  } else if (submitType === 'create') {
    return {
      status: 401,
      body: {
        success: false,
        message: 'What a Paradox',
      },
    };
  } else if (submitType === 'forgot-password') {
    // for now, just return a success message
    return {
      status: 200,
      body: {
        success: true,
        message: 'Success',
      },
    };
  } else {
    return {
      status: 400,
      body: {
        success: false,
        message: 'Invalid auth type',
      },
    };
  }
};

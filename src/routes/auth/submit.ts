import { getDB } from '$lib/db';
import { User } from '$lib/structures/User';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ body }) => {
  if (!(body instanceof FormData)) {
    return {
      status: 400,
      body: {
        success: false,
        message: 'Invalid request body',
      },
    };
  }

  const submitType = body.get('type').toString();

  const userDb = await getDB(User);

  if (submitType === 'login') {
    const email = body.get('email').toString();
    const password = body.get('password').toString();

    const one = await userDb.findOne({ email });
    if (one) {
      const user = User.fromJSON(one);
      if (await user.checkPassword(password)) {
        return {
          status: 200,
          body: {
            success: true,
            message: 'cool man, except theres no login logic yet',
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

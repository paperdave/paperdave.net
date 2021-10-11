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

  const submitType = body.get('type');

  if (submitType === 'login') {
    // for now, just return a success message
    return {
      status: 200,
      body: {
        success: true,
        message: 'Login successful',
        token: 'asdf',
      },
    };
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

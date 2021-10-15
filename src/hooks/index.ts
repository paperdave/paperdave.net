import { handleSession } from 'svelte-kit-cookie-session';

export const handle = handleSession(
  {
    secret: 'th7dc2qc7MR9CaGPkzWrVFUhQR5Zunkg',
    rolling: true,
  },
  async ({ request, resolve }) => {
    const response = await resolve(request);

    return {
      ...response,
      headers: {
        ...response.headers,
        'X-Powered-By': 'chocolate; see https://davecode.me/donate',
      },
    };
  }
);

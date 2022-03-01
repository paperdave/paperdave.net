import { RequestHandler } from '@sveltejs/kit';
import _redirectsList from './simple-redirects.yaml';

const redirectsList: Record<string, string> = _redirectsList;

function getDest(page: string) {
  for (const [key, value] of Object.entries(redirectsList)) {
    if (key.endsWith('/*')) {
      const prefix = key.replace('/*', '');

      if (page.startsWith(prefix)) {
        return page.replace(prefix, value.replace('/*', ''));
      }
    } else if (page === key) {
      return value;
    }
  }
  return null;
}

export const get: RequestHandler = async ({ url }) => {
  const page = url.searchParams.get('page') ?? '';

  const dest = getDest(page);

  return {
    body: { redirect: dest ?? null },
  };
};

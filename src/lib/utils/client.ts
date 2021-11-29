import { browser } from '$app/env';
import { getUser } from '$lib/api-client/session';
import { Permission } from '$lib/structures';
import { Load } from '@sveltejs/kit';
import { encodeRedirect } from './encodeRedirect';

const defaultLoadFunction: Load = () => {
  return { props: {} };
};

export function restrictedPage(permissions: Permission[], load = defaultLoadFunction) {
  const fn: Load = (input) => {
    if (!browser) {
      return {
        props: {},
      };
    }
    const page = input.page;
    const user = getUser();
    if (!user) {
      return {
        status: 302,
        redirect: '/auth?r=' + encodeRedirect(page.path.slice(1)),
      };
    } else if (!user.queryPermissions(permissions)) {
      return {
        status: 302,
        redirect:
          '/auth/missing-permissions?r=' +
          encodeRedirect(page.path.slice(1)) +
          '&p=' +
          permissions.join(','),
      };
    } else {
      return load(input);
    }
  };
  return fn;
}

import { browser } from '$app/env';
import { getUser } from '$lib/api-client/session';
import { Permission } from '$lib/structures';
import { Load } from '@sveltejs/kit';
import { encodeRedirect } from './encode-redirect';

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
    const user = getUser();
    if (!user) {
      return {
        status: 302,
        redirect: '/auth?r=' + encodeRedirect(input.url.pathname.slice(1)),
      };
    } else if (!permissions.every((permission) => user.queryPermission(permission))) {
      return {
        status: 302,
        redirect:
          '/auth/missing-permissions?r=' +
          encodeRedirect(input.url.pathname.slice(1)) +
          '&p=' +
          permissions.join(','),
      };
    } else {
      return load(input);
    }
  };
  return fn;
}

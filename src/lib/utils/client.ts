import { session } from '$app/stores';
import { Permission, WebSession } from '$lib/structures';
import { Load } from '@sveltejs/kit';
import { writable } from 'svelte/store';
import { encodeRedirect } from './encodeRedirect';

let webSessionInstance: WebSession = new WebSession();

export const webSession = writable(webSessionInstance);

session.subscribe((session) => {
  webSessionInstance = session ? WebSession.fromJSON(session) : WebSession.destroyedSession;
  webSession.set(webSessionInstance);
});

export function getWebSession() {
  return webSessionInstance;
}

const defaultLoadFunction: Load = () => {
  return { props: {} };
};

export function restrictedPage(permissions: Permission[], load = defaultLoadFunction) {
  const fn: Load = (input) => {
    const page = input.page;
    const session = getWebSession();
    if (!session.user) {
      return {
        status: 302,
        redirect: '/auth?r=' + encodeRedirect(page.path.slice(1)),
      };
    } else if (!session.user.hasPermissions(permissions)) {
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

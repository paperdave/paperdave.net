import { browser } from '$app/env';
import { JSONData, Permission, WebSession } from '$lib/structures';
import { Load } from '@sveltejs/kit';
import { writable } from 'svelte/store';
import { encodeRedirect } from './encodeRedirect';

declare const davecode: { session: JSONData<WebSession> };

let webSessionInstance: WebSession = browser
  ? typeof davecode !== 'undefined' && davecode.session
    ? WebSession.fromJSON(davecode.session)
    : WebSession.empty
  : WebSession.empty;

export const webSession = writable(webSessionInstance);

export function getWebSession(s?: any) {
  if (s !== undefined) {
    return s ? WebSession.fromJSON(s) : WebSession.empty;
  }
  return webSessionInstance;
}

const defaultLoadFunction: Load = () => {
  return { props: {} };
};

export function restrictedPage(permissions: Permission[], load = defaultLoadFunction) {
  const fn: Load = (input) => {
    const page = input.page;
    const session = getWebSession(input.session);
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

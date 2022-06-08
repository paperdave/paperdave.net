import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { persistent } from "@furudean/svelte-persistent-store/persistent";
import type { JSONValue } from "@sveltejs/kit/types/private";
import { createSWR, SSWR } from "sswr";
import { get } from "svelte/store";
import { parseObjectWithDateStrings } from "./utils/date";
import { encodeRedirect } from "./utils/encode-redirect";

const never = new Promise(() => { });

export const token = persistent<string | null>({
  key: 'auth.token',
  start_value: null,
  storage_type: 'localStorage',
});

async function fetcher(url: string, requestInit: RequestInit = {}) {
  const tokenText = get(token);

  // Request with token (if we have one)
  let data = await fetch(url, {
    ...requestInit,
    headers: tokenText ? {
      'Authorization': `Bearer ${tokenText}`,
      ...requestInit.headers,
    } : requestInit.headers,
  });
  const status = data.status;

  // 401 if token invalid. whenever providing a token to an api, it
  // will error if the token is invalid.
  if (status === 401 && tokenText) {
    token.set(null);
    data = await fetch(url, requestInit);
  }

  // 401 we have already cleared token, so must mean this point requires a token.
  if (status === 401) {
    goto(`/auth?r=${encodeRedirect(location.pathname)}`);
    return never;
  }

  return parseObjectWithDateStrings(await data.json());
}

function getAPIFunction(method: string) {
  return (url: string, init?: RequestInit & { json: JSONValue }) =>
    fetcher(url, {
      method,
      body: init?.json ? JSON.stringify(init.json) : undefined,
      headers: {
        ...init?.headers,
        ...init?.json && { 'Content-Type': 'application/json' },
      },
      ...init
    });
}


class SSWRExtended extends SSWR {
  constructor() {
    super({
      fetcher,
    });
  }

  post = getAPIFunction('POST');
  put = getAPIFunction('PUT');
  delete = getAPIFunction('DELETE');
  patch = getAPIFunction('PATCH');
  setToken = (newToken: string) => token.set(newToken);
}

export const api = new SSWRExtended();

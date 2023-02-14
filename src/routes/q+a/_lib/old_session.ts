// instead of rewriting this to be real i just took the old one
import { goto } from '$app/navigation';
import { persistent } from 'src/store';

import { get } from 'svelte/store';
import { SSWR } from './sswr';

const never = new Promise(() => {
  // never resolves
});

export const token = persistent<string | null>('auth.token', null);

async function fetcher(url: string, requestInit: RequestInit = {}) {
  if (!get(token)) {
    token.set(prompt('token?'));
  }

  const tokenText = get(token);

  // Request with token (if we have one)
  let data = await fetch(url, {
    ...requestInit,
    headers: tokenText
      ? {
          Authorization: `Bearer ${tokenText}`,
          ...requestInit.headers
        }
      : requestInit.headers
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
    goto(`/auth?r=${encodeURIComponent(location.pathname)}`);
    return never;
  }

  const json = await data.json();

  if (Array.isArray(json)) {
    return json.map((x) => {
      if (x.date) {
        x.date = new Date(x.date);
      }
      return x;
    });
  }

  return json;
}

function getAPIFunction(method: string) {
  return (url: string, init?: RequestInit & { json?: any }) =>
    fetcher(url, {
      method,
      body: init?.json ? JSON.stringify(init.json) : undefined,
      headers: {
        ...init?.headers,
        ...(init?.json && { 'Content-Type': 'application/json' })
      },
      ...init
    });
}

class SSWRExtended extends SSWR {
  constructor() {
    super({
      fetcher,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      focusThrottleInterval: 9999999999,
      dedupingInterval: 9999999999
    });
  }

  post = getAPIFunction('POST');
  put = getAPIFunction('PUT');
  delete = getAPIFunction('DELETE');
  patch = getAPIFunction('PATCH');
  setToken = (newToken: string) => token.set(newToken);
}

export const old_api_do_not_use_outside_qa = new SSWRExtended();

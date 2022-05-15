import type { APIError } from '$lib/api-client/APIClient';

type PromiseWrapper<T, E> = Promise<
  | {
      ok: false;
      data: null;
      err: E;
    }
  | {
      ok: true;
      data: T;
      err: null;
    }
>;

type APIPromiseWrapper<T, E> = Promise<
  | {
      ok: false;
      response: null;
      err: E;
    }
  | {
      ok: true;
      response: T;
      err: null;
    }
>;

export function resolveError<T, E = Error>(x: Promise<T>): PromiseWrapper<T, E> {
  return x
    .then((data) => ({ ok: true as const, data, err: null }))
    .catch((err) => ({ ok: false as const, data: null, err }));
}

export function resolveAPIError<T>(x: Promise<T>): APIPromiseWrapper<T, APIError> {
  return x
    .then((response) => ({ ok: true as const, response, err: null }))
    .catch((err) => ({ ok: false as const, response: null, err }));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function deferred<T>(): [Promise<T>, (x: T) => void, (err: any) => void] {
  let resolve!: (x: T) => void;
  let reject!: (err: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return [promise, resolve, reject];
}

type PromiseWrapper<T> = Promise<
  | {
      ok: false;
      data: null;
      err: any;
    }
  | {
      ok: true;
      data: T;
      err: null;
    }
>;

export function resolveError<T>(x: Promise<T>): PromiseWrapper<T> {
  return x
    .then((data) => ({ ok: true as const, data, err: null }))
    .catch((err) => ({ ok: false as const, data: null, err }));
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

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

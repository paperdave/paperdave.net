export type MaybePromise<T> = T | Promise<T>;
export type MaybeArray<T> = T | T[];
export type MaybeArrayOrPromise<T> = MaybePromise<MaybeArray<T>>;

export async function maybePromise<T>(value: MaybePromise<T>): Promise<T> {
  return value instanceof Promise ? await value : value;
}

export function maybeArray<T>(value: MaybeArray<T>): T[] {
  return value instanceof Array ? value : [value];
}

export async function maybeArrayOrPromise<T>(value: MaybeArrayOrPromise<T>): Promise<T[]> {
  return value instanceof Promise ? await value.then(maybeArray) : maybeArray(value);
}

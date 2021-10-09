/** Takes a class and removes all methods. */
export type Data<T> = {
  [P in keyof T as T[P] extends (...args: unknown[]) => unknown ? never : P]: T[P];
};

/**
 * Takes a class and removes all methods, and converts Maps into Records, Sets into arrays, and
 * dates into strings
 */
export type JSONData<T> = Data<
  {
    [P in keyof T]: T[P] extends Map<string, infer V>
      ? Record<string, V>
      : T[P] extends Set<infer V>
      ? V[]
      : T[P] extends Date
      ? string
      : T[P];
  }
>;

/** Converts an record to a map */
export function recordToMap<T>(obj: Record<string, T>): Map<string, T> {
  const map = new Map<string, T>();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      map.set(key, obj[key]);
    }
  }
  return map;
}

/** Converts a map to a record */
export function mapToRecord<T>(map: Map<string, T>): Record<string, T> {
  const obj: Record<string, T> = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}

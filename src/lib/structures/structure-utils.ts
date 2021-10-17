/** Takes a class and removes all methods. */
export type Data<T> = {
  [P in keyof T as T[P] extends (...args: never[]) => unknown ? never : P]: T[P];
};

/**
 * Takes a class and removes all methods, and converts Maps into Records, Sets into arrays, and
 * dates into strings
 */
export type JSONData<T> = T extends { toJSON(): infer U } ? U : never;

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

export function schema(name: string) {
  return function (target: any) {
    target.structureName = name;
  };
}

export const REDACTED = '[REDACTED]';

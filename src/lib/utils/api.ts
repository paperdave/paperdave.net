export interface APIErrorResponse {
  error: string;
}

export interface GenericSuccess {
  success: true;
}

export function getProperties<T>(data: T, props: string | null): T {
  if (props === null) return data;
  const obj: any = {};
  // force _v to exist
  if ((data as any)._v) {
    obj._v = (data as any)._v;
  }
  props.split(',').forEach((prop) => {
    obj[prop] = (data as any)[prop];
  });
  return obj;
}

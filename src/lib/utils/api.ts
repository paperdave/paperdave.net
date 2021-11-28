import { JSONData, User } from '$lib/structures';
import { Headers, Location, MaybePromise } from '@sveltejs/kit/types/helper';
import { StrictBody } from '@sveltejs/kit/types/hooks';

export interface APILocals {
  user: User;
}

export interface APIErrorResponse {
  error: string;
}

export interface GenericSuccess {
  success: true;
}

export type AsJson<T> = T extends string | number | boolean | null | undefined
  ? T
  : T extends Function
  ? never
  : T extends object
  ? { [K in keyof T]: AsJson<T[K]> }
  : never;

export type APIResponse<Body extends unknown> = {
  status?: number;
  headers?: Partial<Headers>;
  body?: Body & AsJson<Body>;
};

export type APIRequest<Locals = Record<string, any>, Body = unknown> = Location & {
  method: string;
  headers: Headers;
  rawBody: StrictBody;
  body: Body;
  locals: Locals;
};

export type APIHandler<Input = unknown, Output extends unknown = never> = (
  request: APIRequest<APILocals, JSONData<Input>>
) => MaybePromise<void | APIResponse<JSONData<Output> | APIErrorResponse>>;

export type GetAPIHandler<Output extends unknown = never> = APIHandler<void, Output>;

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

import { User } from '$lib/structures';
import { APIHandler, GenericSuccess, GetAPIHandler } from '$lib/utils/api';

export const get: GetAPIHandler<User> = async ({}) => {};

export const post: APIHandler<User, GenericSuccess> = async ({}) => {};

export const put: APIHandler<User, GenericSuccess> = async ({}) => {};

export const patch: APIHandler<User, GenericSuccess> = async ({}) => {};

export const del: APIHandler<User, GenericSuccess> = async ({}) => {};

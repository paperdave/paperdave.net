import { QuestionRequest } from '$lib/structures';
import { APIHandler, GenericSuccess, GetAPIHandler } from '$lib/utils/api';

export const get: GetAPIHandler<QuestionRequest[]> = async ({}) => {};

export const post: APIHandler<QuestionRequest, GenericSuccess> = async ({}) => {};

export const del: GetAPIHandler<GenericSuccess> = async ({}) => {};

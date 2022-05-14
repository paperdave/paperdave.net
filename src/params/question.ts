import { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
  return /\d{12}/.test(param);
};

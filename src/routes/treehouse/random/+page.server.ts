import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return {
    initialNumber: Math.floor(Math.random() * 999999) + 1
  };
};

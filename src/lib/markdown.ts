import { createParser, defaultRules } from 'svelte-simple-markdown';

export const markdownConfig = {
  parser: createParser(defaultRules),
};

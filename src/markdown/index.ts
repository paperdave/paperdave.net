import { createParser, defaultRules } from 'svelte-simple-markdown';
import MdLink from './MDLink.svelte';

export const defaultMarkdownConfig = {
  parser: createParser(defaultRules),
  renderers: {
    link: MdLink
  }
};

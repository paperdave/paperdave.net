import {
  blockRegex,
  createParser,
  defaultRules,
  inlineRegex,
  parseCaptureInline,
} from 'svelte-simple-markdown';
import MDMentionArtifact from './MDMentionArtifact.svelte';
import MDMentionMessage from './MDMentionMessage.svelte';
import MDParagraph from './MDParagraph.svelte';

const customRules = defaultRules.clone();

customRules.insertBefore('paragraph', {
  name: 'input',
  match: blockRegex(/^i: ((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
  parse: parseCaptureInline,
});

customRules.insertBefore('em', {
  name: 'mentionArtifact',
  match: inlineRegex(/^@([-a-z0-9]+)/),
  parse(capture) {
    return {
      id: capture[1],
    };
  },
});

customRules.insertBefore('em', {
  name: 'mentionMessage',
  match: inlineRegex(/^#([0-9]{12})/),
  parse(capture) {
    return {
      id: capture[1],
    };
  },
});

const parser = createParser(customRules);

export const messageMarkdown = {
  parser,
  renderers: {
    input: MDParagraph,
    paragraph: MDParagraph,
    mentionArtifact: MDMentionArtifact,
    mentionMessage: MDMentionMessage,
  },
};

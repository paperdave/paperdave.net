import MdLink from 'src/markdown/MDLink.svelte';
import {
  blockRegex,
  createParser,
  defaultRules,
  inlineRegex,
  parseCaptureInline
} from 'svelte-simple-markdown';
import MDAttachment from './MDAttachment.svelte';
import MDHTML from './MDHTML.svelte';
import MDMentionArtifact from './MDMentionArtifact.svelte';
import MDMentionMessage from './MDMentionMessage.svelte';
import MDParagraph from './MDParagraph.svelte';

const customRules = defaultRules.clone();

customRules.remove('heading');

/** Input paragraphs. any paragraph prefixed with `i:` */
customRules.insertBefore('paragraph', {
  name: 'question',
  match: blockRegex(/^q: ((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
  parse: parseCaptureInline
});

/** An artifact mention, formatted like `@id-of-thing` */
customRules.insertBefore('em', {
  name: 'mentionArtifact',
  match: inlineRegex(/^@([-a-z0-9]+)/),
  parse(capture) {
    return {
      id: capture[1]
    };
  }
});

/** A message mention, formatted like `#112233445566` */
customRules.insertBefore('em', {
  name: 'mentionMessage',
  match: inlineRegex(/^#([0-9]{12})/),
  parse(capture) {
    return {
      id: capture[1]
    };
  }
});

/** html block. allows arbitrary html, but rn only as an answer. formatted like `@html content here` */
customRules.insertBefore('paragraph', {
  name: 'html',
  match: blockRegex(/^@html ((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
  parse(capture) {
    return {
      data: capture[1]
    };
  }
});

const artifactCaptures = [
  /^games\/([a-z0-9-]+)/,
  /^stories\/([a-z0-9-]+)/,
  /^videos\/([a-z0-9-]+)/
  // /^music\/([a-z0-9-]+)/,
];

/** Adjust autolinking to use my own components if possible */
customRules.insertBefore('url', {
  name: 'autolink_mention',
  match: inlineRegex(/^https?:\/\/(?:paperdave\.net|localhost:\d+)\/([^\s<]+[^<.,:;"')\]\s])/),
  parse(capture) {
    const qaMatch = capture[1].match(/^q\+a\/([0-9]{12})/);
    if (qaMatch) {
      return {
        type: 'mentionMessage',
        id: qaMatch[1]
      };
    }

    const artifactMatch = artifactCaptures.find((x) => capture[1].match(x));
    if (artifactMatch) {
      return {
        type: 'mentionArtifact',
        id: capture[1].match(artifactMatch)[1]
      };
    }

    return {
      type: 'link',
      content: [
        {
          type: 'text',
          content: capture[1]
        }
      ],
      target: capture[1],
      title: undefined
    };
  }
});

const parser = createParser(customRules);

export const messageMarkdown = {
  parser,
  renderers: {
    link: MdLink,
    question: MDParagraph,
    paragraph: MDParagraph,
    mentionArtifact: MDMentionArtifact,
    mentionMessage: MDMentionMessage,
    attachment: MDAttachment,
    html: MDHTML
  }
};

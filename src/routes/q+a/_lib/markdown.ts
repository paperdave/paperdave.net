import MdLink from 'src/markdown/MDLink.svelte';
import { decodeMediaId, type MediaType } from 'src/media-id';
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

/** Adjust autolinking to use my own components if possible */
customRules.insertBefore('url', {
  name: 'autolink_mention',
  match: inlineRegex(
    /^https?:\/\/(?:paperdave\.net|davecode\.net|localhost:3000)\/([^\s<]+[^<.,:;"')\]\s])/
  ),
  parse(capture) {
    const qaMatch = capture[1].match(/^q\+a\/([0-9]{12})/);
    if (qaMatch) {
      return {
        type: 'mentionMessage',
        id: qaMatch[1]
      };
    }

    const split = capture[1].split('/');
    if (split.length === 1) {
      return {
        type: 'mentionArtifact',
        id: split[0]
      };
    } else if (split.length === 2) {
      return {
        type: 'mentionArtifact',
        id: split[1]
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

/** Hyperlink shortcuts */
function getGithubPrefix(extra: string[]) {
  if (extra.length === 0) {
    return 'github: ';
  } else if (extra[0] === 'pull' || extra[0] === 'issue') {
    return `${extra[0]} #${extra[1]} on `;
  } else if (extra[0] === 'commit') {
    return `this commit on `;
  } else if (extra[0] === 'tree') {
    return `${extra[1]} on `;
  } else if (extra[0] === 'blob') {
    return `this file on `;
  } else if (extra[0] === 'wiki') {
    return `github wiki: `;
  }
  return 'github: ';
}
customRules.insertBefore('em', {
  name: 'autolink_github',
  match: inlineRegex(/^github:([^ ]+)/),
  parse(capture) {
    const data = capture[1].split('/');

    const subpaths = ['issues', 'pulls', 'commit', 'blob', 'tree', 'wiki'];
    const find = data.findIndex((x) => subpaths.includes(x));
    const pathStart = find === -1 ? data.length : find;
    let [user, repo] = data.slice(0, pathStart);
    if (!repo) {
      repo = user;
      user = 'davecaruso';
    }
    const extra = data.slice(pathStart);
    const url = `https://github.com/${user}/${repo}${extra.length ? '/' + extra.join('/') : ''}`;

    return {
      type: 'link',
      content: [
        {
          type: 'text',
          content: `${getGithubPrefix(extra)}${user === 'davecaruso' ? '' : user + '/'}${repo}`
        }
      ],
      target: url
    };
  }
});

const dataDecoderTypeToLabel: Record<MediaType, string> = {
  webp: 'image',
  png: 'image',
  jpeg: 'image',
  avif: 'image',
  webm: 'video',
  av1: 'video',
  mp4: 'video',
  flac: 'audio',
  mp3: 'audio',
  wav: 'audio'
};
customRules.insertBefore('em', {
  name: 'attachment',
  match: inlineRegex(
    /^file:([a-zA-Z0-9][a-zA-Z0-9_-]{20}[\/a-zA-Z0-9#$%*+,\.:;=?@[\]^_{|}~-]+)(?:\(([^)]*)\))?/
  ),
  parse(capture, parse, state) {
    const data = capture[1];
    const decoded = decodeMediaId(data);
    return {
      type: 'attachment',
      data: decoded,
      content: capture[2]
        ? parse(capture[2], state)
        : [
            {
              type: 'text',
              content: `pasted ${dataDecoderTypeToLabel[decoded.type]}`
            }
          ]
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

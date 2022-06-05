import { decodeImageUrl, decodeVideoUrl } from '$lib/utils/media-url';
import {
  blockRegex,
  createParser,
  defaultRules,
  inlineRegex,
  parseCaptureInline,
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
  name: 'input',
  match: blockRegex(/^i: ((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
  parse: parseCaptureInline,
});

/** An artifact mention, formatted like `@id-of-thing` */
customRules.insertBefore('em', {
  name: 'mentionArtifact',
  match: inlineRegex(/^@([-a-z0-9]+)/),
  parse(capture) {
    return {
      id: capture[1],
    };
  },
});

/** A message mention, formatted like `#112233445566` */
customRules.insertBefore('em', {
  name: 'mentionMessage',
  match: inlineRegex(/^#([0-9]{12})/),
  parse(capture) {
    return {
      id: capture[1],
    };
  },
});

/** html block. allows arbitrary html, but rn only as an answer. formatted like `@html content here` */
customRules.insertBefore('paragraph', {
  name: 'html',
  match: blockRegex(/^@html ((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
  parse(capture) {
    return {
      data: capture[1],
    };
  },
});

/** Adjust autolinking to use my own components if possible */
customRules.insertBefore('url', {
  name: 'autolink_mention',
  match: inlineRegex(/^https?:\/\/(?:davecode\.net|localhost:3000)\/([^\s<]+[^<.,:;"')\]\s])/),
  parse(capture) {
    const ioMatch = capture[1].match(/^io\/([0-9]{12})/);
    if (ioMatch) {
      return {
        type: 'mentionMessage',
        id: ioMatch[1],
      };
    }

    const split = capture[1].split('/');
    if (split.length === 1) {
      return {
        type: 'mentionArtifact',
        id: split[0],
      };
    } else if (split.length === 2) {
      return {
        type: 'mentionArtifact',
        id: split[1],
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
    const find = data.findIndex(x => subpaths.includes(x))
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
        },
      ],
      target: url,
    }
  }
});
customRules.insertBefore('em', {
  name: 'autolink_media',
  match: inlineRegex(/^media:([^ ]+)/),
  parse(capture) {
    const data = capture[1].split('/');
    const basename = data[data.length - 1];
    return {
      type: 'attachment',
      filename: basename,
      target: `https://media.davecode.net/${basename}`,
    }
  }
});
const dataDecoderTypeToFunc = {
  img: decodeImageUrl,
  video: decodeVideoUrl,
  audio: decodeVideoUrl,
  vid: decodeVideoUrl,
  aud: decodeVideoUrl,
};
const dataDecoderTypeToLabel = {
  img: 'image',
  video: 'video',
  audio: 'audio',
  vid: 'video',
  aud: 'audio',
};
customRules.insertBefore('em', {
  name: 'autolink_imagestring',
  match: inlineRegex(/^(img|vid(?:eo)?|aud(?:io)?):([a-z0-9+_-]{32}(?:\/[a-z0-9](?:\/[a-zA-Z0-9#$%*+,.:;=?@[\]^_{|}~-]))?)(?:\(([^)]*)\))?/),
  parse(capture) {
    const type = capture[1];
    const data = capture[2];
    return {
      type: 'attachment',
      filename: capture[2] ?? ('pasted ' + dataDecoderTypeToLabel[type]),
      target: dataDecoderTypeToFunc[type](data).url,
    }
  }
});

const parser = createParser(customRules);

export const messageMarkdown = {
  parser,
  renderers: {
    input: MDParagraph,
    paragraph: MDParagraph,
    mentionArtifact: MDMentionArtifact,
    mentionMessage: MDMentionMessage,
    attachment: MDAttachment,
    html: MDHTML
  },
};
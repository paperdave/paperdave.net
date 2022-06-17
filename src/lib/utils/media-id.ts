const URL_BASE = `https://media.davecode.net/upload`;

interface DecodedImage {
  url: string;
  aspect?: string;
  blurhash?: string;
  hash?: string;
}

function gcd(a: number, b: number) {
  return b ? gcd(b, a % b) : a;
}

function reduce(numerator: number, denominator: number) {
  const divide = gcd(numerator, denominator);
  return [numerator / divide, denominator / divide];
}

function decodeAspect(aspect: string) {
  if (aspect === '$') return '16/9';
  const [width, height] = aspect.split(':');
  if (height) {
    return `${parseInt(width, 32)}/${parseInt(height, 32)}`;
  } else {
    return width;
  }
}

function encodeAspect(width: number, height: number) {
  const [numerator, denominator] = reduce(width, height);
  if (numerator === 16 && denominator === 9) {
    return '$';
  }

  const a = `${numerator.toString(32)}:${denominator.toString(32)}`;
  const b = `${width / height}`.replace(/$0\./g, '');

  return a.length <= b.length ? a : b;
}

function decodeImageUrl(string: string): DecodedImage {
  if (!string) return null;

  if (string.startsWith('/') || string.startsWith('http')) {
    return {
      url: string.startsWith('/') ? string : new URL(string).toString(),
    };
  }

  const [hash, aspect, blurhash] = string.split('/');
  if (!hash.match(/[a-f0-9]{32}/)) {
    return null;
  }

  return {
    hash,
    url: `${URL_BASE}/${hash.slice(0, 2)}/${hash}.webp`,
    aspect: aspect ? decodeAspect(aspect) : undefined,
    blurhash,
  };
}

const hashCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
export async function hashMediaData(data: ArrayBufferLike) {
  const bytes = new Uint8Array(await crypto.subtle.digest('sha-256', data));
  let string = '';
  for (let i = 0; i < 3 * 5; i += 3) {
    const a = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
    string += hashCharacters[a >> 18];
    string += hashCharacters[(a >> 12) & 63];
    string += hashCharacters[(a >> 6) & 63];
    string += hashCharacters[a & 63];
  }
  return string;
}

const extensionToTypeChar = {
  'blob': '*',
  'webp': 'i',
  'webm': 'v',
  'mp4': '4',
  'mp3': '3',
  'wav': 'w',
  'flac': 'f',
  'png': 'p',
  'jpeg': 'j',
  'av1': 'a',
  'avif': 'A',
};

const imageExtensions = ['webp', 'png', 'avif'];

export type MediaType = keyof typeof extensionToTypeChar;

const typeCharToExtension = Object.keys(extensionToTypeChar).reduce((acc, key: MediaType) => {
  acc[extensionToTypeChar[key]] = key;
  return acc;
}, {} as { [key: string]: MediaType });

export type MediaDataAllowWidthHeight = MediaData | {
  type: MediaType;
  hash: string;
  blurhash?: string;
  width: number;
  height: number;
  duration?: number;
}

export type MediaData = {
  type: MediaType;
  hash: string;
  blurhash?: string;
  aspect?: string;
  duration?: number;
}

export type DecodedMediaData = MediaData & { url: string };

export function createMediaId(options: MediaDataAllowWidthHeight) {
  const [width, height] = 'aspect' in options ?
    options.aspect.includes('/')
      ? options.aspect.split('/').map(x => parseInt(x, 10))
      : [parseInt(options.aspect, 10), 1]
    : 'width' in options && 'height' in options ? [options.width, options.height] : [];

  let str = `${extensionToTypeChar[options.type]}${options.hash}`;
  if (width && height) {
    const aspect = encodeAspect(width, height);
    str += `${aspect}`;
  }

  if (options.blurhash) {
    str += `/${options.blurhash}`;
  }
  if (options.duration) {
    str += `/${options.duration.toString(36)}`;
  }
  return str;
}

export function decodeMediaId(id: string) {
  if (!id) return null;

  const legacy = decodeImageUrl(id);
  if (legacy) return {
    type: 'webp',
    url: legacy.url,
    hash: legacy.hash,
    blurhash: legacy.blurhash,
    aspect: legacy.aspect,
  };

  const firstSlashIndexOf = id.indexOf('/');
  const endOfAspect = firstSlashIndexOf === -1 ? 21 : firstSlashIndexOf;

  const media: DecodedMediaData = {
    type: typeCharToExtension[id.slice(0, 1)],
    hash: id.slice(1, 21),
    url: URL_BASE,
  };
  media.url += `/${media.hash[0]}/${media.hash}.${media.type}`;

  if (endOfAspect >= 21) {
    media.aspect = decodeAspect(id.slice(21, endOfAspect + 1));
  }

  if (firstSlashIndexOf !== -1) {
    const extra = id.slice(endOfAspect + 1).split('/');
    if (extra.length === 2) {
      media.blurhash = extra[0];
      media.duration = parseInt(extra[1], 32);
    } else if (extra.length === 1) {
      if (imageExtensions.includes(media.type)) {
        media.blurhash = extra[0];
      } else {
        media.duration = parseInt(extra[0], 32);
      }
    }
  }

  return media;
}
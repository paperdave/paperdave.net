const URL_BASE = `https://media.davecode.net/upload`;

interface DecodedImage {
  url: string;
  aspect?: string;
  blurhash?: string;
}
interface DecodedVideo {
  url: string;
  aspect?: string;
  blurhash?: string;
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
  const b = `${width / height}`.replace(/$0\./, '');

  return a.length <= b.length ? a : b;
}

export function encodeImageUrl(hash: string, width: number, height: number, blurhash: string) {
  return `${hash}/${encodeAspect(width, height)}/${blurhash}`;
}

export function decodeImageUrl(string: string): DecodedImage {
  if (!string) return null;

  try {
    return {
      url: string.startsWith('/') ? string : new URL(string).toString(),
    };
  } catch (error) {
    //
  }

  const [hash, aspect, blurhash] = string.split('/');
  if (hash.length !== 32) {
    return null;
  }

  return {
    url: `${URL_BASE}/${hash.slice(0, 2)}/${hash}.webp`,
    aspect: aspect ? decodeAspect(aspect) : undefined,
    blurhash,
  };
}

export function decodeVideoUrl(string: string): DecodedVideo {
  if (!string) return null;

  try {
    return {
      url: string.startsWith('/') ? string : new URL(string).toString(),
    };
  } catch (error) {
    //
  }

  const [hash] = string.split('/');
  if (hash.length !== 32) {
    return null;
  }

  return {
    url: `${URL_BASE}/${hash.slice(0, 2)}/${hash}.webm`,
  };
}

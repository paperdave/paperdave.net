const URL_BASE = `https://media.davecode.net/upload`;

interface DecodedImage {
  url: string;
  aspect?: string;
  blurhash?: string;
}

function parseAspect(aspect: string) {
  const [width, height] = aspect.split(':');
  if (height) {
    return `${parseInt(width, 32)}/${parseInt(height, 32)}`;
  } else {
    return width;
  }
}

export function decodeImageUrl(string: string): DecodedImage {
  if (!string) return null;

  try {
    return {
      url: new URL(string).toString(),
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
    aspect: aspect ? parseAspect(aspect) : undefined,
    blurhash,
  };
}

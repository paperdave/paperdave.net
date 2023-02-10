export const CDN = 'https://media.paperdave.net';

const imageFormats = ['webp', 'jpeg'];

const imageTypes = {
  album: {
    sizes: [3000, 1000, 512, 64]
  }
};

// VIDEOS

export interface CDNVideoFullMeta {
  title: string;
  key: string;
  files: [CDNVideoHLSFile, ...CDNVideoDownloadFile[]];
  encodeDate: string;
  encodeTime: number;
  resolution: {
    width: number;
    height: number;
    fps: number;
  };
  quality: '4k' | '1080p' | '720p';
  totalSize: number;
  webmDownload?: string;
  mp4Download?: string;
  originalDownload?: string;
  thumbnails?: CDNVideoThumbnail[];
  blurhash?: string;
  thumbnailEncodeTime?: number;
}

export interface CDNVideoMeta {
  key: string;
  title: string;
  thumb: boolean;
  q: '4k' | '1080p' | '720p';
  hls: string;
  webm: string;
  original?: string;
  bh?: string;
}

interface CDNVideoHLSFile {
  type: 'application/x-mpegURL';
  url: string;
  streams: CDNVideoHLSStream[];
  size: number;
  encodeTime?: number;
}

interface CDNVideoHLSStream {
  width: number;
  height: number;
  fps: number;
  size: number;
}

interface CDNVideoDownloadFile {
  type: 'video/webm' | 'video/mp4' | 'original';
  url: string;
  size: number;
  encodeTime?: number;
}

interface CDNVideoThumbnail {
  type: 'jpeg' | 'webp';
  width: number;
  url: string;
}

export const getCdnVideoMetaURL = (key: string) => `${CDN}/video/${key}/meta.json`;

export const getCdnVideoFullMetaURL = (key: string) => `${CDN}/video/${key}/index.json`;

export const getCdnVideoStreamURL = (key: string) => `${CDN}/video/${key}/hls.m3u8`;

export const getCdnVideoThumbnailURLs = (key: string) =>
  imageFormats
    .map((ext) =>
      [1920, 1280, 640, 400].map((size) => ({
        url: `${CDN}/video/${key}/thumbnail/${size}w.${ext}`,
        size,
        type: `image/${ext}`
      }))
    )
    .flat();

export const getCdnVideoDownloadURL = (key: string, title: string) =>
  `${CDN}/video/${key}/${title}.webm`;

export const fetchCdnVideoMeta = async (key: string) => {
  const response = await fetch(getCdnVideoMetaURL(key));
  return response.json() as Promise<CDNVideoMeta>;
};

export const fetchCdnVideoFullMeta = async (key: string) => {
  const response = await fetch(getCdnVideoFullMetaURL(key));
  return response.json() as Promise<CDNVideoFullMeta>;
};

// SONGS

/**
 * WIP
 */
export interface CDNSongMeta {
  key: string;
  title: string;
  flac?: string | null;
  mp3?: string | null;
}

/**
 * WIP
 */
export interface CDNSongFullMeta {
  key: string;
  title: string;
  meta: {
    artist?: string;
    year?: number;
    track?: number;
    publisher?: string;
    copyright?: string;
  };
  formats: CDNSongFormatMeta[];
  totalSize: number;
  encodeTime: number;
  encodeDate: string;
}

export interface CDNSongFormatMeta {
  type: string;
  purpose: CDNSongFormatPurpose;
  url: string;
  size: number;
}

export type CDNSongFormatPurpose = 'stream' | 'download';

export const getCdnSongMetaURL = (key: string) => `${CDN}/song/${key}/meta.json`;

export const getCdnSongFullMetaURL = (key: string) => `${CDN}/song/${key}/index.json`;

export const getCdnSongDownloadURL = //
  (key: string, title: string) => `${CDN}/song/${key}/${title}.mp3`;

export const getCdnSongStreamURLs = (key: string) => [
  { url: `${CDN}/song/${key}/media.ogg`, type: 'audio/ogg' },
  { url: `${CDN}/song/${key}/media.aac`, type: 'audio/aac' }
];

export const getCdnSongLyricsURL = (key: string) => `${CDN}/song/${key}/lyrics.txt`;

// IMAGES

/**
 * WIP
 */
export interface CDNImageFullMeta {
  key: string;
  type: string;
  images: CDNImageEntry[];
  encodeDate: string;
  encodeTime: number;
  totalSize: number;
}

export interface CDNImageEntry {
  width: number;
  height: number;
  format: 'jpeg' | 'webp';
  size: number;
  url: string;
}

export interface CDNImageMeta {
  key: string;
  type: string;
  w: number;
  h: number;
}

export const getCdnImageFullMetaURL = (key: string, type: keyof typeof imageTypes) =>
  `${CDN}/img/${type}/${key}/index.json`;

export const getCdnImageMetaURL = (key: string, type: keyof typeof imageTypes) =>
  `${CDN}/img/${type}/${key}/meta.json`;

export const getCdnImageURLs = (key: string, type: keyof typeof imageTypes, maxSize?: number) =>
  imageFormats
    .map((ext) =>
      imageTypes[type].sizes.map((size) => ({
        url: `${CDN}/img/${type}/${key}/${size}.${ext}`,
        size,
        type: `image/${ext}`
      }))
    )
    .flat()
    .filter((image) => !maxSize || image.size <= maxSize);

export const getCdnImageSrcSet = (key: string, type: keyof typeof imageTypes, maxSize?: number) =>
  getCdnImageURLs(key, type, maxSize)
    .map((image) => `${image.url} ${image.size}w`)
    .join(', ');

// ATTACHMENTS

/**
 * WIP
 */
export interface CDNAttachmentFullMeta {
  key: string;
  filename: string;
  uploadDate: string;
}

export const getCdnAttachmentMetaURL = (key: string) => `${CDN}/file/${key}/index.json`;

export const getCdnAttachmentURL = (key: string, filename: string) =>
  `${CDN}/file/${key}/${filename}`;

export const fetchCdnAttachmentMeta = async (key: string) => {
  const response = await fetch(getCdnAttachmentMetaURL(key));
  return response.json() as Promise<CDNAttachmentFullMeta>;
};

export const fetchCdnAttachmentURL = async (key: string) => {
  const meta = await fetchCdnAttachmentMeta(key);
  return getCdnAttachmentURL(key, meta.filename);
};

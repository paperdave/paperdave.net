import { createMediaId, decodeMediaId, hashMediaData } from '$lib/utils/media-id';
import { describe, it, expect, vi } from 'vitest';
import { webcrypto } from 'crypto';

vi.stubGlobal('crypto', webcrypto);

describe('media id', () => {
  // We do not really care about the actual hash, but we do insist it is 20 characters long.
  it('hash function encodes to a string of length 20', async () => {
    const randomBytes = new Uint8Array(20);
    crypto.getRandomValues(randomBytes);
    const str = await hashMediaData(randomBytes);
    expect(str).toBeTypeOf('string');
    expect(str).to.have.length(20);
  });

  it('encodes image media ids properly', () => {
    // we can use [placeholders] because this function is only expected to shove values in place.
    expect(createMediaId({
      type: 'webp',
      hash: '[hash]',
      aspect: '1/1',
      blurhash: '[blurhash]',
    })).toBe('i[hash]1/[blurhash]');
    expect(createMediaId({
      type: 'png',
      hash: '[hash]',
      aspect: '16/9',
      blurhash: '[blurhash]',
    })).toBe('p[hash]$/[blurhash]');
    expect(createMediaId({
      type: 'avif',
      hash: '[hash]',
      width: 1920,
      height: 1080,
      blurhash: '[blurhash]',
    })).toBe('A[hash]$/[blurhash]');
    expect(createMediaId({
      type: 'jpeg',
      hash: '[hash]',
      width: 1920,
      height: 1080,
    })).toBe('j[hash]$');
    expect(createMediaId({
      type: 'webp',
      hash: '[hash]',
      width: 400,
      height: 300,
    })).toBe('i[hash]4:3');
  });

  it('encodes video media ids properly', () => {
    expect(createMediaId({
      type: 'mp4',
      hash: '[hash]',
      width: 1920,
      height: 1080,
      duration: 60,
    })).toBe('4[hash]$/1o');
    expect(createMediaId({
      type: 'mp4',
      hash: '[hash]',
      width: 1080,
      height: 1920,
      duration: 300,
    })).toBe('4[hash]9:g/8c');
    expect(createMediaId({
      type: 'webm',
      hash: '[hash]',
      width: 200,
      height: 200,
      duration: 1,
    })).toBe('v[hash]1/1');
    expect(createMediaId({
      type: 'webm',
      hash: '[hash]',
      width: 400,
      height: 200,
    })).toBe('v[hash]2');
  });

  it('encodes audio media ids properly', () => {
    expect(createMediaId({
      type: 'mp3',
      hash: '[hash]',
      duration: 60,
    })).toBe('3[hash]/1o');
    expect(createMediaId({
      type: 'wav',
      hash: '[hash]',
      duration: 324,
    })).toBe('w[hash]/90');
    expect(createMediaId({
      type: 'flac',
      hash: '[hash]',
      duration: 60,
    })).toBe('f[hash]/1o');
  });

  it('decodes webp test 1', () => {
    expect(decodeMediaId('iZijjl6Cu2-F28KEFLU0340:2b/L14eEAE00J-q54xb-XNF0J%3}_In')).toEqual({
      type: "webp",
      hash: "Zijjl6Cu2-F28KEFLU03",
      url: "https://media.davecode.net/upload/Z/Zijjl6Cu2-F28KEFLU03.webp",
      aspect: "128/75",
      blurhash: "L14eEAE00J-q54xb-XNF0J%3}_In",
    });
  })
})
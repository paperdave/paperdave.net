import { LCH2sRGB, parseHex, makeHex, sRGB2LCH, type ColorArray } from './color-utils';

export class LCHPalette {
  #hue: number;
  #chroma: number;
  #cache = new Map<number, ColorArray>();
  initialLightness?: number;

  constructor(hue: number, chroma: number, initialLightness?: number) {
    this.#hue = hue;
    this.#chroma = chroma;
    this.initialLightness = initialLightness;
  }

  static fromRGB(rgb: ColorArray) {
    const [l, c, h] = sRGB2LCH(rgb);
    return new LCHPalette(h, c, l);
  }

  static fromHex(hex: string) {
    return LCHPalette.fromRGB(parseHex(hex));
  }

  get hue(): number {
    return this.#hue;
  }

  set hue(hue: number) {
    this.#hue = hue;
    this.#cache.clear();
  }

  get chroma(): number {
    return this.#chroma;
  }

  set chroma(chroma: number) {
    this.#chroma = chroma;
    this.#cache.clear();
  }

  colorAt(lightness: number): ColorArray {
    if (!this.#cache.has(lightness)) {
      this.#cache.set(lightness, this.calculate(lightness));
    }
    return this.#cache.get(lightness)!;
  }

  colorOn(lightness: number) {
    return this.colorAt(this.lightnessOn(lightness));
  }

  lightnessOn(lightness: number) {
    return (
      lightness +
      (lightness > 50 //
        ? lightness > 80
          ? -65
          : -60
        : lightness < 20
        ? 65
        : 60)
    );
  }

  hexAt(lightness: number) {
    return makeHex(this.colorAt(lightness));
  }

  hexOn(lightness: number) {
    return makeHex(this.colorOn(lightness));
  }

  private calculate(lightness: number) {
    return LCH2sRGB([lightness, this.#chroma, this.#hue]);
  }
}

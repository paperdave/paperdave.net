<!-- 
  @component
  ThemeRoot allows you to change the page theme (background, foreground, accent, etc) for
  components. Theme values are all CSS variables, so you can embed multiple ThemeRoots
  in your application at once, and even nest them.

  ThemeRoot expects one child, which is automatically set to the full size of the parent, this is
  prefered over modifying the styles of this element itself. When placed in a flexbox, ThemeRoot
  expands to fill the space.
-->
<svelte:options immutable />

<script context="module" lang="ts">
  import './theme.scss';
  import { getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { parseHex, type ColorArray } from './color-utils';
  import { LCHPalette } from './LCHPalette';

  const symbol = Symbol.for('@paperdave/ui/theme');

  export interface ThemeContext {
    neutral: LCHPalette;
    primary: LCHPalette;
    secondary: LCHPalette;
    tertiary: LCHPalette;
    // error: LCHPalette;
  }

  export function getTheme(): SvelteStore<ThemeContext> {
    return getContext(symbol);
  }
</script>

<script lang="ts">
  export let inline = false;

  export let foreground: string | undefined = undefined;
  export let background: string = '#f2f2f2';
  export let primary: string = '#22c646';
  export let secondary: string | undefined = undefined;
  export let tertiary: string | undefined = undefined;
  export let backgroundImage: string | undefined = undefined;
  // export let error: string = '#ff0000';

  const rgb = (c: ColorArray) => c.map((x) => Math.round(x)).join(',');

  $: neutralPal = LCHPalette.fromHex(background);
  $: primaryPal = LCHPalette.fromHex(primary);
  $: secondaryPal = secondary
    ? LCHPalette.fromHex(secondary)
    : new LCHPalette((primaryPal.hue + 60) % 360, primaryPal.chroma, primaryPal.initialLightness);
  $: tertiaryPal = tertiary
    ? LCHPalette.fromHex(tertiary)
    : new LCHPalette((primaryPal.hue + 180) % 360, primaryPal.chroma, primaryPal.initialLightness);

  $: _primaryLightness = primaryPal.initialLightness!;
  $: _secondaryLightness = secondaryPal.initialLightness!;
  $: _tertiaryLightness = tertiaryPal.initialLightness!;

  $: bgLightness = neutralPal.initialLightness!;

  const themeContextStore = writable({} as ThemeContext);
  $: themeContextStore.set({
    neutral: neutralPal,
    primary: primaryPal,
    secondary: secondaryPal,
    tertiary: tertiaryPal
  });
  setContext(symbol, themeContextStore);

  let self: HTMLElement;
  $: typeof window !== 'undefined' && [neutralPal, primaryPal, secondaryPal, tertiaryPal] &&
    beforeSwapTheme();

  function beforeSwapTheme() {
    if (!self) return;
    self.classList.add('swap');
    setTimeout(() => {
      self.classList.remove('swap');
    });
  }
</script>

<theme-root
  bind:this={self}
  class:inline
  style:--bg={rgb(neutralPal.colorAt(bgLightness))}
  style:--on-bg={foreground ? rgb(parseHex(foreground)) : rgb(neutralPal.colorOn(bgLightness))}
  style:--pri={rgb(primaryPal.colorAt(_primaryLightness))}
  style:--on-pri={rgb(primaryPal.colorOn(_primaryLightness))}
  style:--on-bg-pri={rgb(
    primaryPal.colorAt((neutralPal.lightnessOn(bgLightness) + 1.5 * _primaryLightness) / 2.5)
  )}
  style:--sec={rgb(secondaryPal.colorAt(_secondaryLightness))}
  style:--on-sec={rgb(secondaryPal.colorOn(_secondaryLightness))}
  style:--on-bg-sec={rgb(
    secondaryPal.colorAt((neutralPal.lightnessOn(bgLightness) + 1.5 * _secondaryLightness) / 2.5)
  )}
  style:--tri={rgb(tertiaryPal.colorAt(_tertiaryLightness))}
  style:--on-tri={rgb(tertiaryPal.colorOn(_tertiaryLightness))}
  style:--on-bg-tri={rgb(
    tertiaryPal.colorAt((neutralPal.lightnessOn(bgLightness) + 1.5 * _tertiaryLightness) / 2.5)
  )}
  style:background-image={backgroundImage}
>
  <slot />
</theme-root>

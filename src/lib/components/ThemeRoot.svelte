<!-- 
  @component ThemeRoot allows you to change the page theme (background, foreground, accent, etc) for
  theme-based components. Theme values are all CSS variables, so you can embed multiple ThemeRoots
  in your application, or even nest them.

  ThemeRoot expects one child, which is automatically set to the full size of the parent, this is
  prefered over modifying the styles of this element itself. When placed in a flexbox, ThemeRoot
  expands to fill the space.
-->
<script lang="ts">
  import { palette } from '$lib/theme';

  import Color from 'color';

  /** Passing true to `dark` will swap the default background and foreground colors. */
  export let dark = false;
  /** Foreground color, used primarily for text. */
  export let foreground: string | undefined = undefined;
  /** Background color, applied as the background of this element, but also available in the theme context. */
  export let background: string | undefined = undefined;
  /** Accent color, used for buttons, links, etc. */
  export let accent = palette.green[500];
  /** Links generally use the accent color by default, but there are some cases this isn't desired. */
  export let linkColor: string | null = null;

  $: foregroundColor = new Color(foreground ?? (dark ? palette.grey[50] : palette.grey[900]));
  $: backgroundColor = new Color(background ?? (dark ? palette.grey[800] : palette.grey[100]));
  $: accentColor = new Color(accent);
</script>

<theme-root
  style:--foreground={[
    `${Math.round(foregroundColor.hue())}`,
    `${Math.round(foregroundColor.saturationl())}%`,
    `${Math.round(foregroundColor.lightness())}%`,
  ].join(',')}
  style:--background={[
    `${Math.round(backgroundColor.hue())}`,
    `${Math.round(backgroundColor.saturationl())}%`,
    `${Math.round(backgroundColor.lightness())}%`,
  ].join(',')}
  style:--accent-hue={Math.round(accentColor.hue())}
  style:--accent-saturation={Math.round(accentColor.saturationl())}
  style:--accent-lightness={Math.round(accentColor.lightness())}
  style:--link-color={linkColor}
  style:--input-background={backgroundColor.luminosity() > 0.5
    ? backgroundColor.lighten(0.3).hex()
    : backgroundColor.darken(0.3).hex()}
  class:dark>
  <slot />
</theme-root>

<!-- styles are in global.scss, because we need to have stuff on the global :root -->

<!-- 
  @component
  ThemeRoot allows you to change the page theme (background, foreground, accent, etc) for
  theme-based components. Theme values are all CSS variables, so you can embed multiple ThemeRoots
  in your application, or even nest them.

  ThemeRoot expects one child, which is automatically set to the full size of the parent, this is
  prefered over modifying the styles of this element itself. When placed in a flexbox, ThemeRoot
  expands to fill the space.
-->
<script lang="ts">
  import { browser } from '$app/env';
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

  let self: HTMLElement;

  $: backgroundColor = new Color(background ?? (dark ? palette.grey[800] : palette.grey[100]));
  $: foregroundColor = new Color(
    foreground ?? (backgroundColor.isDark() ? palette.grey[50] : palette.grey[900])
  );
  $: accentColor = new Color(accent);

  $: isDark = backgroundColor.isDark();

  $: browser && [foregroundColor, backgroundColor, accentColor, linkColor] && beforeSwapTheme();

  async function beforeSwapTheme() {
    if (!self) return;
    self.classList.add('swap');
    setTimeout(() => {
      self.classList.remove('swap');
    });
  }
</script>

<theme-root
  bind:this={self}
  style:--dark={isDark ? 1 : 0}
  style:--light={isDark ? 0 : 1}
  style:--fg-hue={Math.round(foregroundColor.hue())}
  style:--fg-sat={Math.round(foregroundColor.saturationl()) + '%'}
  style:--fg-lit={Math.round(foregroundColor.lightness()) + '%'}
  style:--bg-hue={Math.round(backgroundColor.hue())}
  style:--bg-sat={Math.round(backgroundColor.saturationl()) + '%'}
  style:--bg-lit={Math.round(backgroundColor.lightness()) + '%'}
  style:--acc-hue={Math.round(accentColor.hue())}
  style:--acc-sat={Math.round(accentColor.saturationl()) + '%'}
  style:--acc-lit={Math.round(accentColor.lightness()) + '%'}
  style:--on-acc={accentColor.isDark() ? '0,0%,100%' : '0,0%,0%'}
  style:--link-color={linkColor}>
  <slot />
</theme-root>

<!-- styles are in global.scss, because we need to have stuff on the global :root -->

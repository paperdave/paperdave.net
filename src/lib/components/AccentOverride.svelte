<!-- 
  @component
  A ThemeRoot but only for modifying the accent color.
-->
<script lang="ts">
  import { browser } from '$app/env';
  import { palette } from '$lib/theme';
  import Color from 'color';

  /** Accent color, used for buttons, links, etc. */
  export let accent = palette.green[500];

  let self: HTMLElement;

  $: accentColor = new Color(accent);

  $: browser && [accentColor] && beforeSwapTheme();

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
  style:--acc-hue={Math.round(accentColor.hue())}
  style:--acc-sat={Math.round(accentColor.saturationl()) + '%'}
  style:--acc-lit={Math.round(accentColor.lightness()) + '%'}
  style:--on-acc={accentColor.isDark() ? '0,0%,100%' : '0,0%,0%'}>
  <slot />
</theme-root>

<style lang="scss">
  theme-root {
    display: contents;
  }
</style>

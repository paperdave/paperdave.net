<script lang="ts">
  import Color from 'color';

  export let dark = false;
  export let foreground = dark ? 'white' : 'black';
  export let background = dark ? 'black' : 'white';
  export let accent = '#22c646';
  export let linkColor: string | null = null;

  let foregroundColor = new Color(foreground);
  let backgroundColor = new Color(background);
  let accentColor = new Color(accent);
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
  class:dark>
  <slot />
</theme-root>

<!-- styles are in global.scss -->

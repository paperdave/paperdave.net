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

  export let padding = false;
</script>

<theme-root
  style="
  --foreground: {Math.round(foregroundColor.hue())},
    {Math.round(foregroundColor.saturationl())}%,
    {Math.round(foregroundColor.lightness())}%;
  --background: {Math.round(backgroundColor.hue())},
    {Math.round(backgroundColor.saturationl())}%,
    {Math.round(backgroundColor.lightness())}%;
  --accent-hue: {Math.round(accentColor.hue())};
  --accent-saturation: {Math.round(accentColor.saturationl())}%;
  --accent-lightness: {Math.round(accentColor.lightness())}%;
  {linkColor ? `--link-color:${linkColor};` : ''}
"
  class:padding
  class:dark
  grow>
  <slot />
</theme-root>

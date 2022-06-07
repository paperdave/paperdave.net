<script lang="ts">
  import { decodeMediaId } from '$lib/utils/media-url';

  import Img, { type ObjectFit, type StretchMode } from './Img.svelte';

  export let src: string;
  export let alt: string;
  export let noBlur = false;
  export let noDrag = false;
  export let fit: ObjectFit | undefined = undefined;
  export let stretch: StretchMode = fit ? 'both' : 'width';
  export let fade = 400;
  export let absolute = false;

  // TODO: make this not open a new tab
  // let isEnlarged = false;

  $: img = decodeMediaId(src);
</script>

<a href={img.url}>
  <Img {src} {alt} {noBlur} {noDrag} {fit} {stretch} {fade} {absolute} />
</a>

<script context="module" lang="ts">
  export type ObjectFit =
    | 'contain'
    | 'cover'
    | 'fill'
    | 'none'
    | 'scale-down'
    | 'scale-to-fill'
    | 'unset';
  export type StretchMode = 'absolute' | 'width' | 'height' | 'both';
</script>

<script lang="ts">
  import { browser } from '$app/environment';
  import { useEffect } from '$lib';
  import { decodeMediaId } from 'src/media-id';
  const threshold = 75;
  export let src: string;
  export let alt: string;
  export let noBlur = false;
  export let noDrag = false;
  export let fit: ObjectFit | undefined = undefined;
  export let stretch: StretchMode = fit ? 'both' : 'width';
  export let fade = 400;
  export let absolute = false;
  let image: HTMLImageElement;
  $: img = decodeMediaId(src);
  $: isBlurhash = !noBlur && !!img?.blurhash;
  let start = Date.now();
  $: showCanvas = isBlurhash;
  $: loaded = !isBlurhash;
  let transition = false;
  useEffect(
    () => {
      if (isBlurhash) return;
      start = Date.now();
      loaded = image.complete;
      transition = !loaded;
      showCanvas = !loaded;
      if (loaded) {
        setTimeout(() => {
          showCanvas = false;
        }, 100);
      }
    },
    () => [img?.url, image]
  );
  function onLoad() {
    const duration = Date.now() - start;
    transition = duration > threshold;
    showCanvas = transition;
    loaded = true;
    if (showCanvas) {
      setTimeout(() => {
        showCanvas = false;
      }, fade + 100);
    }
  }
</script>

{#if img}
  <figure
    class="stretch-{stretch}"
    class:isBlurhash
    class:absolute
    style:aspect-ratio={img.aspect}
    on:click
  >
    {#if showCanvas}
      <blurhash-image blurhash={img.blurhash} />
    {/if}
    {#if browser || !isBlurhash}
      <img
        bind:this={image}
        src={img.url}
        {alt}
        class:transition
        style:opacity={!isBlurhash || loaded ? 1 : 0}
        style:transition-duration={browser && transition && `${fade}ms`}
        style:object-fit={fit}
        draggable={noDrag ? 'false' : undefined}
        loading="lazy"
        decoding="async"
        on:load={onLoad}
      />
    {/if}
  </figure>
{/if}

<style lang="scss">
  figure {
    position: relative;
    margin: 0;
    flex: 1;
    & > :global(*) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .transition {
    transition: opacity ease-in-out;
  }
  .stretch-width,
  .stretch-both {
    width: 100%;
  }
  .stretch-height,
  .stretch-both {
    height: 100%;
  }
  .absolute {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

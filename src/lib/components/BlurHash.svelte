<script lang="ts">
  import { browser } from '$app/env';

  import { useEffect } from '$lib/hooks/useEffect';

  export let hash: string;
  export let src: string;
  export let alt: string;
  export let fade = 400;
  export let threshold = 50;

  let img: HTMLImageElement;

  let start = 0;
  let showCanvas = true;
  let loaded = false;
  let transition = true;

  useEffect(
    () => {
      start = Date.now();
      loaded = img.complete;
      transition = !loaded;
      if (loaded) {
        setTimeout(() => {
          showCanvas = false;
        }, 100);
      }
    },
    () => [img]
  );
</script>

<main>
  {#if showCanvas}
    <blurhash-image blurhash={hash} />
  {/if}
  {#if browser}
    <img
      bind:this={img}
      {src}
      {alt}
      style={browser && transition ? `transition-duration:${fade}ms` : undefined}
      loading="lazy"
      decoding="async"
      on:load={() => {
        console.log('loaded');

        if (Date.now() - start < threshold) {
          transition = false;
        }

        loaded = true;

        if (transition) {
          let thisImage = img;
          setTimeout(() => {
            if (thisImage === img) {
              showCanvas = false;
            }
          }, fade + 100);
        }
      }}
      class:loaded
      class:transition />
  {/if}
</main>

<style lang="scss">
  main {
    flex: 1;
    width: 100%;
    height: 100%;
    position: relative;

    & > :global(*) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  img {
    opacity: 0;
  }
  .transition {
    transition: opacity 0.5s;
  }
  .loaded {
    opacity: 1;
  }
</style>

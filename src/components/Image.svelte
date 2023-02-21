<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string | string[];
  export let alt: string;
  export let blurhash: string | undefined = undefined;

  let img: HTMLImageElement;

  onMount(() => {
    if (!img.complete) {
      img.style.animation = 'none';
      img.style.opacity = '0';
      img.addEventListener(
        'load',
        () => {
          img.style.opacity = '1';
        },
        { once: true }
      );
    }
  });
</script>

<blurhash-image {blurhash} />
<img
  bind:this={img}
  src={typeof src === 'string' ? src : undefined}
  srcset={typeof src === 'string' ? undefined : src.join(',')}
  {alt}
/>

<style>
  * {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  img {
    z-index: 10;
    animation: fade-in 50ms 50ms linear;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

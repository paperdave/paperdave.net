<script context="module" lang="ts">
  function decodeSrc(src: string) {
    if (!src) return;

    try {
      return {
        url: new URL(src).toString(),
        blurhash: null,
      };
    } catch (error) {
      //
    }

    const [hash, blurhash] = src.split('/');
    if (hash.length === 32) {
      return {
        url: `https://media.davecode.net/upload/${hash.slice(0, 2)}/${hash}.png`,
        blurhash,
      };
    }
  }
</script>

<script lang="ts">
  import BlurHash from './BlurHash.svelte';

  export let src: string;
  export let alt: string;
  export let noBlurhash = false;

  $: img = decodeSrc(src);
</script>

{#if img}
  {#if img.blurhash && !noBlurhash}
    <BlurHash hash={img.blurhash} src={img.url} {alt} />
  {:else}
    <img src={img.url} {alt} />
  {/if}
{/if}

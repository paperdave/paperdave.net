<script lang="ts">
  import { ImageMedia } from '$lib/structures/Media';
  import BlurHash from './BlurHash.svelte';

  export let src: ImageMedia;
  export let alt: string;
</script>

{#if src}
  {#if src.hash}
    <BlurHash hash={src.hash} src={src.url} {alt} />
  {:else}
    <img src={src.url} {alt} />
  {/if}
{/if}

<style lang="scss">
</style>

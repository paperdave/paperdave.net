<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import type { ASTNode } from 'svelte-simple-markdown';
  import type { DecodedMediaData } from '$lib/utils/media-url';

  export let node: ASTNode;

  function getDuration(duration: number) {
    const days = Math.floor(duration / 86400);
    const hours = Math.floor((duration % 86400) / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    return [days, hours, minutes, seconds]
      .filter((part, i) => i > 1 || part > 0)
      .map((part) => part.toString().padStart(2, '0'))
      .join(':')
      .replace(/^0+/, '');
  }

  $: data = node.data as DecodedMediaData;
</script>

<a class="custom" href={node.target}>
  <span class="icon">
    <Icon name="attachment" />
  </span>
  <slot />
  {#if data.duration}
    ({getDuration(data.duration)})
  {/if}
</a>

<style lang="scss">
  a {
    font-family: 'Recursive', sans-serif;
    font-size: 1rem;
    color: white;
    transition: background-color 0.2s ease-in-out;
    border-radius: 4px;
    background-color: #27c62255;
    padding: 0 0.25rem;

    &:hover {
      background-color: #27c622aa;
    }
    &:active {
      transition-duration: 0ms;
      background-color: #27c622ff;
    }
  }
  .icon {
    display: inline-grid;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 0.8rem;
    transform: scale(1.4) translateY(0.6px);
  }
</style>

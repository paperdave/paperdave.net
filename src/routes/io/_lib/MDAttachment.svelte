<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import type { ASTNode } from 'svelte-simple-markdown';
  import { parseMessageDateID } from './utils';
  export let node: ASTNode;
</script>

<a class="custom" href={node.target}>
  <span class="icon">
    <Icon name="attachment" />
  </span>
  {#if node.content}
    <slot />
  {:else}
    {node.filename}
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

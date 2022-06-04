<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { formatDate } from '$lib/utils/date';
  import type { ASTNode } from 'svelte-simple-markdown';
  import { parseMessageDateID } from './utils';
  export let node: ASTNode;

  $: date = parseMessageDateID(node.id);
</script>

<a sveltekit:prefetch class="custom" href="/io/{node.id}">
  <span class="icon">
    <Icon name="message" />
  </span>
  {#if node.content}
    <slot />
  {:else}
    {formatDate(date, 'date-time')}
  {/if}
</a>

<style lang="scss">
  a {
    transition: background-color 0.2s ease-in-out;
    border-radius: 4px;
    background-color: #22c6ad55;
    padding: 0 0.25rem;

    &:hover {
      background-color: #22c6adaa;
    }
    &:active {
      transition-duration: 0ms;
      background-color: #22c6adff;
    }
  }
  .icon {
    display: inline-grid;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 0.8rem;
  }
</style>

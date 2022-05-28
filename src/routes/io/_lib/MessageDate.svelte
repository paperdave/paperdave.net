<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { formatDate } from '$lib/utils/date';
  import type { Message } from '@prisma/client';

  export let message: Message;

  let copyState: boolean | null = null;

  async function copy() {
    if (message.type === 'REJECT') return;
    if (copyState) return;

    const id = formatDate(message.date, 'message-id');
    const url = `${window.location.origin}/io/${id}`;

    try {
      await navigator.clipboard.writeText(url);
      copyState = true;
    } catch (error) {
      copyState = false;
    }
    setTimeout(() => {
      copyState = null;
    }, 1500);
  }

  const dateString = formatDate(message.date, 'date-time');
</script>

<time
  datetime={message.date.toISOString()}
  on:click={copy}
  class:success={copyState}
  class:clickable={message.type === 'NORMAL'}>
  {#if copyState === null}
    {dateString}
  {:else if copyState}
    Copied
  {:else}
    Failed
  {/if}
  <span class="icon">
    <Icon name="link" />
  </span>
</time>

<style lang="scss">
  time {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 0.28rem;
    width: max-content;
    color: #999;
    font-size: 0.9rem;

    .icon {
      display: none;
      height: 1rem;
    }
  }

  .clickable {
    cursor: pointer;

    &:hover {
      color: #faa719;
      .icon {
        display: block;
      }
    }
    &:active {
      color: #ff3a32;
    }

    &.success {
      color: #51d064;
      :global(svg) {
        display: block;
      }
    }
  }
</style>

<script lang="ts">
  import Icon from 'src/components/Icon.svelte';
  import { formatDate } from 'src/date';
  import type { Question } from '@prisma/client';

  export let question: Question;
  export let sandbox = false;

  let copyState: boolean | null = null;

  async function copy() {
    if (question.type === 'Reject') return;
    if (copyState) return;

    const id = formatDate(question.date, 'question-id');
    const url = `${window.location.origin}/q+a/${id}`;

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

  const dateString = formatDate(question.date, 'date-time');
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<time
  tabindex="-1"
  datetime={new Date(question.date).toISOString()}
  on:click={copy}
  class:success={copyState}
  class:clickable={question.type === 'Normal' && !sandbox}
>
  {#if copyState === null}
    {sandbox ? 'q&a sandbox question' : dateString}
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
    line-height: 1rem;

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

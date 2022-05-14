<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';

  import { Question } from '$lib/structures';
  import { formatDate } from '$lib/utils/date';

  export let question: Question;

  let copyState: boolean | null = null;

  async function copy() {
    if (question.isRejected()) return;
    if (copyState) return;

    const id = question.getDateId();
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

<time
  datetime={question.date.toISOString()}
  on:click={copy}
  class:success={copyState}
  class:clickable={!question.isRejected()}>
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

<script lang="ts">
  import { Question } from '$lib/structures';
  import LinkSVG from '$lib/svg/fluent/Link.svg';
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

<time datetime={question.date.toISOString()} on:click={copy} class:success={copyState} class:clickable={!question.isRejected()}>
  {#if copyState === null}
    {dateString}
  {:else if copyState}
    Copied
  {:else}
    Failed
  {/if}
  <LinkSVG />
</time>

<style lang="scss">
  time {
    color: #999;
    font-size: 0.9rem;
    margin-bottom: 0.28rem;
    display: flex;
    gap: 0.25rem;
    width: max-content;

    :global(svg) {
      height: 1rem;
      display: none;
    }
  }

  .clickable {
    cursor: pointer;

    &:hover {
      color: #faa719;
      :global(svg) {
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

<script lang="ts">
  import { Question } from '$lib/structures';
  import LinkSVG from '$lib/svg/fluent/Link.svg?component';
  import { formatDate } from '$lib/utils/date';

  export let question: Question;

  let copyState: boolean | null = null;

  async function copy() {
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

<main on:click={copy} class:success={copyState}>
  {#if copyState === null}
    {dateString}
  {:else if copyState}
    Copied
  {:else}
    Failed
  {/if}
  <LinkSVG />
</main>

<style lang="scss">
  main {
    font-family: 'Roboto Slab';
    color: #999;
    margin-bottom: 0.1rem;
    cursor: pointer;
    display: flex;
    gap: 0.25rem;
    width: max-content;

    :global(svg) {
      width: 1.5rem;
      display: none;
    }

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

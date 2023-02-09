<script context="module" lang="ts">
  export const resolvedArtifactContext = Symbol('resolvedArtifactContext');
</script>

<script lang="ts">
  import { messageMarkdown } from './markdown';
  import QuestionDate from './QuestionDate.svelte';
  import { Markdown } from 'svelte-simple-markdown';
  import { setContext } from 'svelte';
  import type { QuestionWithResolvedArtifacts } from './utils';

  export let question: QuestionWithResolvedArtifacts;
  export let sandbox = false;

  setContext(resolvedArtifactContext, question.artifacts);
</script>

<article>
  {#if question.type !== 'Marker'}
    <QuestionDate {question} {sandbox} />
    {#if question.type === 'Reject'}
      <p class="red">[this question was rejected]</p>
    {:else}
      <Markdown config={messageMarkdown} value={question.text} />
    {/if}
  {:else}
    <p class="marker">{question.text}</p>
  {/if}
</article>

<style lang="scss">
  .red {
    color: red;
  }
  .marker {
    color: #999;
    background-color: #222;
    padding: 1rem;
    border-radius: 5px;
  }
  article :global {
    position: relative;
    line-height: 1.25rem;
    --pri: 0, 184, 155;
    --on-bg-pri: 0, 184, 155;
    --on-pri: 0, 0, 0;
    --text-casual: 1;
    --on-bg: 83, 208, 102;
    color: rgb(var(--on-bg));

    code {
      background-color: rgba(var(--on-bg), 0.2);
      color: rgb(var(--on-bg));
      padding: 0.05rem 0.2rem;
      border-radius: 5px;
    }

    ul {
      margin-bottom: 0.5rem;
      padding-left: 0;
    }
    li::before {
      position: absolute;
      content: '-';
      left: 0;
    }
    li {
      padding-left: 0.75rem;
      margin-bottom: 0.5rem;
      list-style: none;
    }
  }
</style>

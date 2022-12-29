<script context="module" lang="ts">
  export const resolvedArtifactContext = Symbol('resolvedArtifactContext');
</script>

<script lang="ts">
  import type { Message } from '@prisma/client';
  import { messageMarkdown } from './markdown';
  import MessageDate from './MessageDate.svelte';
  import { Markdown } from 'svelte-simple-markdown';
  import { setContext } from 'svelte';
  import type { MessageWithResolvedArtifacts } from './utils';

  export let message: MessageWithResolvedArtifacts;

  setContext(resolvedArtifactContext, message.artifacts);
</script>

<article>
  {#if message.type !== 'MARKER'}
    <MessageDate {message} />
    {#if message.type === 'REJECT'}
      <p class="red">this message has been rejected</p>
    {:else}
      <Markdown config={messageMarkdown} value={message.text} />
    {/if}
  {:else}
    <p class="marker">{message.text}</p>
  {/if}
</article>

<style lang="scss">
  .red {
    color: red;
  }
  .marker {
    --fg: var(--restore-fg);
    color: #999;
    background-color: hsla(var(--fg), 0.1);
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

    & > * {
      --fg: 129, 57%, 57%;
      color: hsl(var(--fg));
    }

    code {
      background-color: hsla(var(--fg), 0.2);
      color: hsl(var(--fg));
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

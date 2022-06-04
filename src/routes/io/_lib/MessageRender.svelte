<script lang="ts">
  import type { Message } from '@prisma/client';
  import { messageMarkdown } from './markdown';
  import MessageDate from './MessageDate.svelte';
  import { Markdown } from 'svelte-simple-markdown';

  export let message: Message;
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
    color: #999;
    background-color: hsla(var(--fg), 0.1);
    padding: 1rem;
    border-radius: 5px;
  }
</style>

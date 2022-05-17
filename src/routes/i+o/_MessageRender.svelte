<script lang="ts">
  import type { Message } from '@prisma/client';
  import { mdConfig } from './_markdown';
  import MessageDate from './_MessageDate.svelte';
  import { Markdown } from 'svelte-simple-markdown';

  export let message: Message;
</script>

<article>
  <MessageDate {message} />
  {#if message.type === 'REJECT'}
    <p class="red">this message has been rejected</p>
  {:else}
    <Markdown config={mdConfig} value={message.text} />
  {/if}
</article>

<style lang="scss">
  .red {
    color: red;
  }
</style>

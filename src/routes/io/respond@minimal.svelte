<script lang="ts">
  import type { Message, MessageInput } from '@prisma/client';
  import MessageRespondPage from './_lib/MessageRespondPage.svelte';

  export let messages: MessageInput[];

  function messageFromInput(input: MessageInput): Message {
    if (!input) return null;
    return {
      date: new Date(input.date),
      text:
        input.prompt
          .split('\n')
          .filter(Boolean)
          .map((x) => `i: ${x}`)
          .join('\n\n') + '\n\n',
      type: 'NORMAL',
    };
  }

  $: input = messages[0];
  $: message = messageFromInput(input);

  function next() {
    messages = messages.slice(1);
  }

  function defer() {
    messages = messages.slice(1).concat(messages[0]);
  }
</script>

{#if input}
  {#key input}
    <MessageRespondPage
      {input}
      {message}
      on:done={next}
      on:defer={defer}
      inboxLength={messages.length} />
  {/key}
{:else}
  all caught up! 🎉
{/if}

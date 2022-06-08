<script lang="ts">
  import { useEffect } from '$lib/hooks/useEffect';

  import { api } from '$lib/session';
  import type { Message, MessageInput } from '@prisma/client';
  import MessageRespondPage from './_lib/MessageRespondPage.svelte';

  const { data: messages } = api.useSWR<MessageInput[]>('/io/api/responses');

  let current: Date | null = null;

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

  $: input = $messages?.find((x) => x.date === current) ?? null;
  $: message = messageFromInput(input);

  useEffect(
    () => {
      console.log('useEffect');
      if (current === null && $messages && $messages?.length) {
        current = $messages[0].date;
      }
    },
    () => [current === null && $messages]
  );

  function next() {
    const index = $messages?.findIndex((x) => x.date === current) ?? 0;
    $messages = $messages.filter((x) => x.date !== current);
    current = $messages[index]?.date ?? null;
  }

  function defer() {
    current =
      $messages[($messages.findIndex((x) => x.date === current) + 1) % $messages.length].date;
  }
</script>

{#if input}
  {#key input}
    <MessageRespondPage
      {input}
      {message}
      on:done={next}
      on:defer={defer}
      inboxLength={$messages.length} />
  {/key}
{:else}
  all caught up! 🎉
{/if}

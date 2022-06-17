<script lang="ts">
  import { useEffect } from '$lib/hooks/useEffect';

  import { api } from '$lib/session';
  import type { Message, MessageInput } from '@prisma/client';
  import MessageRespondPage from './_lib/MessageRespondPage.svelte';

  const { data: messages, isLoading } = api.useSWR<MessageInput[]>('/io/api/responses');

  let current: Date | null = null;

  function messageFromInput(current: Date): Message {
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

  $: input = $messages?.find((x) => x.date.getTime() === current?.getTime()) ?? null;
  $: message = messageFromInput(current);

  useEffect(
    () => {
      if (current === null && $messages && $messages?.length) {
        current = $messages[0].date;
      }
    },
    () => [current, $messages]
  );

  function next() {
    $messages = $messages.filter((x) => x.date.getTime() !== current.getTime());
    current = $messages[0]?.date ?? null;
  }

  function defer() {
    current =
      $messages[
        ($messages.findIndex((x) => x.date.getTime() === current.getTime()) + 1) % $messages.length
      ].date;
  }
</script>

{#if input}
  {#key current.getTime()}
    <MessageRespondPage
      {input}
      {message}
      on:done={next}
      on:defer={defer}
      inboxLength={$messages.length} />
  {/key}
{:else if !$isLoading}
  <span style="font-size: 4rem;padding:2rem;">all caught up! 🎉</span>
{:else}
  loading...
{/if}

<script lang="ts">
  import { useEffect } from '$lib/hooks/useEffect';

  import { api } from '$lib/session';
  import type { Message, MessageInput } from '@prisma/client';
  import MessageRespondPage from './_lib/MessageRespondPage.svelte';

  const { data: messages, isValid, revalidate } = api.useSWR<MessageInput[]>('/io/api/responses');

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
    revalidate({ force: true });

    const index = $messages?.findIndex((x) => x.date === current) ?? 0;
    $messages = $messages.filter((x) => x.date !== current);
    current = $messages[index + 1]?.date ?? null;
    if (!current) {
      current = $messages[0]?.date;
    }
  }

  function defer() {
    current =
      $messages[($messages.findIndex((x) => x.date === current) + 1) % $messages.length].date;
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
{:else if $isValid}
  all caught up! 🎉
{:else}
  loading...
{/if}

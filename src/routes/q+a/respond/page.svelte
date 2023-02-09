<script lang="ts">
  import type { Question, QuestionInput } from '@prisma/client';
  import { useEffect } from 'src/lib';
  import QuestionRespondPage from '../_lib/QuestionRespondPage.svelte';
  import { old_api_do_not_use_outside_qa as api } from '../_lib/old_session';

  const { data: questions, isLoading } = api.useSWR('/q+a/api/responses') as any as {
    data: SvelteStore<QuestionInput[]>;
    isLoading: SvelteStore<boolean>;
  };

  let current: Date | null = null;

  function questionFromInput(current: Date): Question {
    if (!input) return null!;

    return {
      date: new Date(input.date),
      text:
        input.prompt
          .split('\n')
          .filter(Boolean)
          .map((x) => `q: ${x}`)
          .join('\n\n') + '\n\n',
      type: 'Normal'
    };
  }

  $: input = $questions?.find((x) => x.date.getTime() === current?.getTime()) ?? null;
  $: question = questionFromInput(current!);

  useEffect(
    () => {
      if (current === null && $questions && $questions?.length) {
        current = $questions[0].date;
      }
    },
    () => [current, $questions]
  );

  function next() {
    $questions = $questions!.filter((x) => x.date.getTime() !== current!.getTime());
    current = $questions[0]?.date ?? null;
  }

  function defer() {
    current =
      $questions![
        ($questions!.findIndex((x) => x.date.getTime() === current!.getTime()) + 1) %
          $questions!.length
      ].date;
  }
</script>

{#if input}
  {#key current?.getTime()}
    <QuestionRespondPage
      {input}
      {question}
      on:done={next}
      on:defer={defer}
      inboxLength={$questions?.length}
    />
  {/key}
{:else if !$isLoading}
  <span style="font-size: 4rem;padding:4rem;">all caught up! 🎉</span>
{:else}
  loading...
{/if}

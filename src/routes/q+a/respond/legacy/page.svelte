<script lang="ts">
  import type { Question, LegacyQuestionInput } from '@prisma/client';
  import QuestionRespondPage from '../../_lib/QuestionRespondPage.svelte';
  import { useEffect } from 'src/lib/util/useEffect';
  import { old_api_do_not_use_outside_qa as api } from '../../_lib/old_session';

  const { data: questions, isLoading } = api.useSWR('/q+a/api/legacy') as any as {
    data: SvelteStore<LegacyQuestionInput[]>;
    isLoading: SvelteStore<boolean>;
  };

  let current: Date | null = null;

  function questionFromInput(current: Date): Question {
    if (!input) return null!;

    return {
      date: new Date(input.date),
      text: input.text
        .replaceAll('&quot;', '"')
        .replaceAll('&apos;', "'")
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        // .replaceAll('&#39;', "'"),
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
        .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16))),

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
    // current =
    //   $questions![
    //     ($questions!.findIndex((x) => x.date.getTime() === current!.getTime()) + 1) %
    //       $questions!.length
    //   ].date;
    next();
  }
</script>

{#if input}
  {#key current?.getTime()}
    <QuestionRespondPage
      legacy
      input={{
        prompt: input.text,
        date: input.date
      }}
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

<script lang="ts">
  import Link from 'src/lib/link/Link.svelte';
  import type { PageData, Snapshot } from './$types';
  import QuestionForm from './_lib/QuestionForm.svelte';
  import QuestionRender from './_lib/QuestionRender.svelte';

  export let data: PageData;

  let content: string | undefined = undefined;
  export const snapshot: Snapshot = {
    capture: () => content,
    restore: (data: string) => (content = data)
  };
</script>

<QuestionForm />

{#if !data.latest}
  <p>
    <strong>page {data.id}</strong> | <Link href="/q+a?page={data.id + 1}#end">newer</Link>
  </p>
{/if}

{#each data.questions as question}
  <QuestionRender
    question={{
      type: question.type ?? 'Normal',
      text: question.text,
      date: question.date,
      artifacts: question.artifacts
    }}
  />
{/each}

{#if data.id !== 0}
  <p id="end">
    <Link href="/q+a?page={data.id - 1}">older</Link>
  </p>
{/if}

<footer>
  fun fact: dave has answered {data.count} questions
</footer>

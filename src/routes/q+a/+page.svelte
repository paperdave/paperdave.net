<script lang="ts">
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

<footer>
  fun fact: dave has answered {data.count} questions
</footer>

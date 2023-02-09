<script lang="ts">
  import type { PageData } from './$types';
  import QuestionForm from './_lib/QuestionForm.svelte';
  import QuestionRender from './_lib/QuestionRender.svelte';

  export let data: PageData;
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

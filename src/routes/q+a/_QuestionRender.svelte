<script lang="ts">
  import { Question } from '$lib/structures';
  import QuestionDate from './_QuestionDate.svelte';
  import QuestionParagraph from './_QuestionParagraph.svelte';

  export let question: Question;
</script>

<main>
  <QuestionDate {question} />
  {#each question.content as paragraph}
    <QuestionParagraph {question} {paragraph} />
  {/each}
</main>

<style lang="scss">
  main {
    margin-bottom: 2rem;
  }
</style>

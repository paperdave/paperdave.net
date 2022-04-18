<script lang="ts">
  import { Question } from '$lib/structures';
  import QuestionDate from './_QuestionDate.svelte';
  import QuestionParagraph from './_QuestionParagraph.svelte';

  export let question: Question;
  export let search: string = '';
</script>

<main>
  <QuestionDate {question} />
  {#if question.isRejected()}
    <p class="red">this question has been rejected</p>
  {:else}
    {#each question.content as paragraph}
      <QuestionParagraph {paragraph} {search} />
    {/each}
  {/if}
</main>

<style lang="scss">
  main {
    margin-bottom: 2rem;
  }
  .red {
    color: red;
  }
</style>

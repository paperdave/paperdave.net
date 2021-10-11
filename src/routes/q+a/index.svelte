<script lang="ts" context="module">
  import { Question } from '$lib/structures';

  import type { Load } from '@sveltejs/kit';
  import QAHeader from './_QAHeader.svelte';

  export const load: Load = async ({ page, fetch }) => {
    const pageNumber = page.query.get('page') || '';

    if (pageNumber !== '') {
      // that page number
    } else {
      const data = await fetch('/q+a/get-latest').then((res) => res.json());
      return {
        props: {
          questions: data.questions.map((x) => Question.fromJSON(x)),
        },
      };
    }
  };
</script>

<script lang="ts">
  import QuestionRender from './_QuestionRender.svelte';

  export let questions: Question[];
</script>

<main>
  <QAHeader />
  <p>i answer anonymous questions you ask, because it's fun.</p>
  <p>todo: svelte form</p>
  <p>and the answers:</p>
  <div class="questions">
    {#each questions as question}
      <QuestionRender {question} />
    {/each}
  </div>
</main>

<style lang="scss">
  p {
    margin-bottom: 3rem;
  }
</style>

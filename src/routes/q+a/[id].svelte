<script context="module" lang="ts">
  import { Question } from '$lib/structures';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ page, fetch }) => {
    const qid = page.params.id;
    if (!qid.match(/^[0-9]{12}$/)) return;

    const q = await fetch(`/q+a/get-q?id=${qid}`).then((r) => r.json());
    if (q.question) {
      return {
        props: {
          question: Question.fromJSON(q.question),
        },
      };
    } else {
      return {
        props: {
          question: null,
        },
      };
    }
  };
</script>

<script lang="ts">
  import QaHeader from './_QAHeader.svelte';
  import QuestionRender from './_QuestionRender.svelte';

  export let question: Question;
</script>

<main>
  <QaHeader />
  {#if question}
    <p>i answer anonymous questions you ask, because it's fun.</p>
    <div class="question">
      <p>this page is a permalink for the following question:</p>
      <QuestionRender {question} />
    </div>
  {:else}
    <p>
      yikes! <br />
      question permalink was not found. did you type it in manually?
    </p>
    <p>
      <a href="/q+a">view questions that do exist</a>
    </p>
  {/if}
</main>

<style lang="scss">
  p {
    margin-bottom: 3rem;
  }
</style>

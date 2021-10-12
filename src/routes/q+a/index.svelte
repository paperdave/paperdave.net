<script lang="ts" context="module">
  import { Question } from '$lib/structures';
  import { User } from '$lib/structures/User';

  import type { Load } from '@sveltejs/kit';
  import QAHeader from './_QAHeader.svelte';

  export const load: Load = async ({ page, fetch }) => {
    const pageNumber = page.query.get('page') || '';

    if (pageNumber !== '') {
      const data = await fetch('/q+a/get-page?page=' + pageNumber).then((res) => res.json());
      if (data.tooNew) {
        return {
          status: 302,
          redirect: `/q+a`,
        };
      }
      return {
        props: {
          isLatestPage: false,
          page: data.page,
          questions: data.questions.map((x) => Question.fromJSON(x)),
        },
      };
    } else {
      const data = await fetch('/q+a/get-latest').then((res) => res.json());
      return {
        props: {
          isLatestPage: true,
          page: data.page,
          questions: data.questions.map((x) => Question.fromJSON(x)),
        },
      };
    }
  };
</script>

<script lang="ts">
  import QuestionRender from './_QuestionRender.svelte';

  export let isLatestPage: boolean;
  export let page: number;
  export let questions: Question[];
</script>

<main>
  <QAHeader />
  <p>i answer anonymous questions you ask, because it's fun.</p>
  {#if isLatestPage}
    <p>todo: svelte form</p>
    <p>and the answers:</p>
  {:else}
    <p>
      page #{page}
      {#if page === 0}
        (we are programmers, start at 0!!!)
      {/if} <br />
      <a href="/q+a?page={page + 1}">newer</a>
    </p>
  {/if}
  <div class="questions">
    {#each questions as question}
      <QuestionRender {question} />
    {/each}
  </div>
  {#if page !== 0}
    <p>
      <a href="/q+a?page={page - 1}">older</a>
    </p>
  {/if}
</main>

<style lang="scss">
  p {
    margin-bottom: 3rem;
  }
</style>

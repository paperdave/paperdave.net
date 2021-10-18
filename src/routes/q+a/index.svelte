<script lang="ts" context="module">
  import { Question } from '$lib/structures';
  import type { JSONData } from '$lib/structures';
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
          pageNumber: data.page,
          questions: data.questions.map((x: JSONData<Question>) => Question.fromJSON(x)),
        },
      };
    } else {
      const data = await fetch('/q+a/get-latest').then((res) => res.json());
      return {
        props: {
          isLatestPage: true,
          pageNumber: data.page,
          questions: data.questions.map((x: JSONData<Question>) => Question.fromJSON(x)),
        },
      };
    }
  };
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import QuestionForm from './_QuestionForm.svelte';
  import QuestionRender from './_QuestionRender.svelte';
  import BackButton from '$lib/components/BackButton.svelte';

  export let isLatestPage: boolean;
  export let pageNumber: number;
  export let questions: Question[];

  let formExpanded = false;
</script>

<main>
  <BackButton position="off-center-right" inverted />
  <QAHeader />
  <section>
    <p>i answer anonymous questions you ask, because it's fun.</p>
    <p>
      {#if !isLatestPage}
        <a href="/q+a">latest</a>
      {:else}
        <strong>latest</strong>
      {/if}
      |
      <a href="/q+a/search">search</a>
      |
      <a href="/q+a/random">random</a>
      |
      {#if $page.path === '/q+a' && $page.query.get('page') === '0'}
        <strong>start</strong>
      {:else}
        <a href="/q+a?page=0">start</a>
      {/if}
    </p>
  </section>
  {#if isLatestPage}
    <section>
      <QuestionForm bind:expanded={formExpanded} />
    </section>
    <section class="opacity-transition" style="opacity:{formExpanded ? 0 : 1}">
      <p>and the answers:</p>
    </section>
  {:else}
    <section>
      <p>
        page #{pageNumber}
        {#if pageNumber === 0}
          (we are programmers, start at 0!!!)
        {/if} <br />
        <a href="/q+a?page={pageNumber + 1}">newer</a>
      </p>
    </section>
  {/if}
  <section class="questions">
    {#each questions as question}
      {#key question.date.getTime()}
        <QuestionRender {question} />
      {/key}
    {/each}
  </section>
  {#if pageNumber !== 0}
    <section>
      <p>
        <a href="/q+a?page={pageNumber - 1}">older</a>
      </p>
    </section>
  {/if}
</main>

<style lang="scss">
  section {
    margin-bottom: 3rem;
  }
  p {
    margin-bottom: 1rem;
  }
  .opacity-transition {
    transition: 100ms opacity ease-in-out;
  }
</style>

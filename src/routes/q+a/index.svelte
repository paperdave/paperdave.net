<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import QAHeader from './_QAHeader.svelte';

  export const load: Load = async ({ page, fetch }) => {
    const API = wrapAPI(fetch);
    const pageNumber = parseInt(page.query.get('page') || '');
    const qpage = await API.questions.getPage(isNaN(pageNumber) ? 'latest' : pageNumber);

    if (!qpage) {
      return {
        status: 302,
        redirect: '/q+a',
      };
    }

    return {
      props: {
        qpage: qpage,
      },
    };
  };
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import QuestionForm from './_QuestionForm.svelte';
  import QuestionRender from './_QuestionRender.svelte';
  import BackButton from '$lib/components/BackButton.svelte';
  import { wrapAPI } from '$lib/api-client/singleton';
  import { QuestionPage } from '$lib/structures/QuestionPage';
  import { user } from '$lib/api-client/session';
  import { Permission } from '$lib/structures';

  export let qpage: QuestionPage;

  $: if (qpage.latest && $page.query.has('page')) {
    history.replaceState(null, '', '/q+a');
  }

  let formExpanded = false;
</script>

<main>
  <BackButton position="off-center-right" inverted />
  <QAHeader />
  <section>
    <p>i answer anonymous questions you ask, because it's fun.</p>
    <p>
      {#if !qpage.latest}
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
      {#if $user !== null && $user.queryPermission(Permission.RESPOND_TO_QUESTIONS)}
        |
        <a href="/q+a/respond" class="special">respond</a>
      {/if}
    </p>
  </section>
  {#if qpage.latest}
    <section>
      <QuestionForm bind:expanded={formExpanded} />
    </section>
    <section class="opacity-transition" style="opacity:{formExpanded ? 0 : 1}">
      <p>and the answers:</p>
    </section>
  {:else}
    <section>
      <p>
        page #{qpage.id}
        {#if qpage.id === 0}
          (we are programmers, start at 0!!!)
        {/if} <br />
        <a href="/q+a?page={qpage.id + 1}">newer</a>
      </p>
    </section>
  {/if}
  <section class="questions">
    {#each qpage.questions as question}
      {#key question.date.getTime()}
        <QuestionRender {question} />
      {/key}
    {/each}
  </section>
  {#if qpage.id !== 0}
    <section>
      <p>
        <a href="/q+a?page={qpage.id - 1}">older</a>
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
  .special {
    color: #faa719;
  }
</style>

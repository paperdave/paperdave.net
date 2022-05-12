<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import QAHeader from './_QAHeader.svelte';

  export const load: Load = async ({ url, fetch }) => {
    const API = wrapAPI(fetch);
    const legacyPageNumber = parseInt(url.searchParams.get('page') || '');

    if (legacyPageNumber) {
      // Pages used to be 20 items per page, now they are 100
      const pageNumber = Math.floor((legacyPageNumber / 100) * 20);
      return {
        status: 302,
        redirect: '/q+a?p=' + pageNumber,
      };
    }

    const pageNumber = parseInt(url.searchParams.get('p') || '');
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
  import { QuestionPage } from '$lib/structures';
  import { user } from '$lib/api-client/session';
  import { Permission } from '$lib/structures';
  import Meta from '$lib/components/Meta.svelte';
  import LinkRow from '$lib/components/LinkRow.svelte';
  import TextBox from '$lib/components/TextBox.svelte';

  export let qpage: QuestionPage;

  $: if (qpage.latest && $page.url.searchParams.has('page')) {
    history.replaceState(null, '', '/q+a');
  }

  let formExpanded = false;
</script>

{#if qpage.latest}
  <Meta
    title="answers & questions"
    description={`i answer anonymous questions you ask, because it's fun. this page is updated every few days after questions are sent.`} />
{:else}
  <Meta
    title="answers & questions - page {qpage.id}"
    description={`i answer anonymous questions you ask, because it's fun. this page is updated every few days after questions are sent.`} />
{/if}

{#if qpage.latest}
  <div>
    <!-- <QuestionForm bind:expanded={formExpanded} /> -->
    <TextBox name="q" label="ask a question" />
  </div>
  <div class="opacity-transition" style="opacity:{formExpanded ? 0 : 1}">
    <p>and the answers:</p>
  </div>
{:else}
  <div>
    <p>
      page #{qpage.id}
      {#if qpage.id === 0}
        (we are programmers, start at 0!!!)
      {/if} <br />
      <a href="/q+a?page={qpage.id + 1}">newer</a>
    </p>
  </div>
{/if}

<div class="questions">
  {#each qpage.questions as question}
    {#key question.date.getTime()}
      <QuestionRender {question} />
    {/key}
  {/each}
</div>

{#if qpage.id !== 0}
  <div>
    <p>
      <a href="/q+a?page={qpage.id - 1}">older</a>
    </p>
  </div>
{/if}

<style lang="scss">
  div {
    margin-bottom: 3rem;
  }
  p {
    margin-bottom: 1rem;
  }
  .opacity-transition {
    transition: 100ms opacity ease-in-out;
  }
</style>

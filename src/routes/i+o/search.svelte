<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, url }) => {
    const API = wrapAPI(fetch);
    const q = url.searchParams.get('q');

    if (q) {
      const questions = await API.questions.search(q);
      return {
        props: {
          lastSearch: q,
          questions,
        },
      };
    }

    return {
      props: {
        lastSearch: '',
        questions: [],
      },
    };
  };
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/env';
  import QuestionRender from './_MessageRender.svelte';
  import { debounce } from '$lib/utils/debounce';
  import type { FlyParams, TransitionConfig } from 'svelte/transition';
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cubicIn, cubicInOut, cubicOut } from 'svelte/easing';
  import { API, wrapAPI } from '$lib/api-client/singleton';
  import Meta from '$lib/components/Meta.svelte';
  import TextBox from '$lib/components/TextBox.svelte';

  export let questions: QuestionPage | null;
  export let lastSearch: string = '';
  let search = $page.url.searchParams.get('q') ?? '';

  async function runSearch() {
    if (!browser) return;

    if (search) {
      questions = await API.questions.search(search);
      history.pushState(null, document.title, `/q+a/search?q=${encodeURIComponent(search)}`);
    } else {
      questions = null;
      history.pushState(null, document.title, `/q+a/search`);
    }
    lastSearch = search;
  }

  export function flyFixed(
    node: Element,
    { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }: FlyParams = {}
  ): TransitionConfig {
    const position = node.getBoundingClientRect();
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;

    const od = target_opacity * (1 - opacity);

    return {
      delay,
      duration,
      easing,
      css: (t, u) => `
        transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
        opacity: ${target_opacity - od * u};
        position: fixed;
        top: ${position.top}px;
        left: ${position.left}px;
        width: ${position.width}px;
        height: ${position.height}px;
      `,
    };
  }

  const debouncedSearch = debounce(runSearch, 200);

  $: qlist = questions?.questions ?? [];
  $: browser && search !== lastSearch && search ? debouncedSearch() : runSearch();
  $: loading = search !== lastSearch;
</script>

<Meta
  title="question search"
  description={`i answer anonymous questions you ask, because it's fun. this page is updated every few days after questions are sent.`} />

<div class="section">
  <TextBox type="text" label="search" bind:value={search} />
</div>

<div class="section" class:loading>
  {#each qlist as question (question.date.getTime())}
    <div
      animate:flip={{ duration: 200, delay: -60, easing: cubicInOut }}
      in:fly={{ duration: 200, opacity: 0, easing: cubicOut, y: 10 }}
      out:flyFixed={{ duration: 200, delay: -60, opacity: 0, easing: cubicIn, y: -10 }}>
      <QuestionRender {question} {search} />
    </div>
  {/each}
  {#if lastSearch && !qlist.length}
    <p class="noresult">no results for <strong>{lastSearch}</strong></p>
  {/if}
</div>

<style lang="scss">
  .section {
    margin-bottom: 3rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .loading {
    opacity: 0.4;
  }

  .noresult {
    color: #df4f3d;
    text-align: center;
  }
</style>

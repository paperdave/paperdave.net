<script lang="ts" context="module">
  import { Question } from '$lib/structures';
  import type { JSONData } from '$lib/structures';
  import type { Load } from '@sveltejs/kit';
  import QaHeader from './_QAHeader.svelte';
  import QaInput from './_QAInput.svelte';

  export const load: Load = async ({ fetch, page }) => {
    const q = page.query.get('q');

    if (q) {
      const data = await fetch(`/q+a/get-search?q=${encodeURIComponent(q)}`).then((x) => x.json());
      const questions = data.questions.map((x: JSONData<Question>) => Question.fromJSON(x));
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
  import QuestionRender from './_QuestionRender.svelte';
  import { debounce } from '$lib/utils/debounce';
  import type { FlyParams, TransitionConfig } from 'svelte/transition';
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cubicIn, cubicInOut, cubicOut } from 'svelte/easing';

  export let questions: Question[];
  export let lastSearch: string = '';
  let search = $page.query.get('q') ?? '';

  async function runSearch() {
    if (!browser) return;

    if (search) {
      const data = await fetch(`/q+a/get-search?q=${encodeURIComponent(search)}`).then((x) =>
        x.json()
      );

      questions = data.questions.map((x: JSONData<Question>) => Question.fromJSON(x));
      history.pushState(null, document.title, `/q+a/search?q=${encodeURIComponent(search)}`);
    } else {
      questions = [];
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

  $: browser && search !== lastSearch && search ? debouncedSearch() : runSearch();
  $: loading = search !== lastSearch;
</script>

<main>
  <QaHeader />

  <section>
    <p>i answer anonymous questions you ask, because it's fun.</p>
    <p>
      <a href="/q+a">latest</a>
      |
      <strong>search</strong>
      |
      <a href="/q+a/random">random</a>
      |
      <a href="/q+a?page=0">start</a>
    </p>
  </section>
  <section>
    <QaInput type="text" placeholder="search..." bind:value={search} fullWidth />
  </section>

  <section class:loading>
    {#each questions as question (question.date.getTime())}
      <div
        animate:flip={{ duration: 200, delay: -60, easing: cubicInOut }}
        in:fly={{ duration: 200, opacity: 0, easing: cubicOut, y: 10 }}
        out:flyFixed={{ duration: 200, delay: -60, opacity: 0, easing: cubicIn, y: -10 }}>
        <QuestionRender {question} {search} />
      </div>
    {/each}
    {#if lastSearch && !questions.length}
      <p class="noresult">no results for <strong>{lastSearch}</strong></p>
    {/if}
  </section>
</main>

<style lang="scss">
  section {
    margin-bottom: 3rem;
  }
  p {
    margin-bottom: 1rem;
  }

  .loading {
    opacity: 0.4;
  }

  .noresult {
    text-align: center;
    color: #df4f3d;
  }
</style>

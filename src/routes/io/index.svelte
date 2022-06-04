<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ props }) => {
    return {
      props: {
        mpage: {
          ...props.mpage,
          messages: props.mpage.messages.map((m) => ({
            ...m,
            type: m.type ?? 'NORMAL',
            date: new Date(m.date),
          })),
        },
      },
    };
  };
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import Meta from '$lib/components/Meta.svelte';
  import MessageRender from './_lib/MessageRender.svelte';
  import type { MessagePage } from './_lib/utils';
  import MessageForm from './_lib/MessageForm.svelte';
  import { browser } from '$app/env';

  export let mpage: MessagePage;

  $: if (browser && mpage.latest && $page.url.searchParams.has('page')) {
    history.replaceState(null, '', '/io');
  }

  let formExpanded = false;
</script>

{#if mpage.latest}
  <Meta
    title="input & output"
    description={`conversations between me and the universe. this page is updated every few days after messages are sent.`} />
{:else}
  <Meta
    title="input & output - page {mpage.id}"
    description={`conversations between me and the universe. this page is updated every few days after messages are sent.`} />
{/if}

{#if mpage.latest}
  <div>
    <MessageForm bind:expanded={formExpanded} />
  </div>
  <p>and my responses:</p>
{:else}
  <div>
    <p>
      page #{mpage.id}
      {#if mpage.id === 0}
        (we are programmers, start at 0!!!)
      {/if} <br />
      <a href="/io?page={mpage.id + 1}">see newer questions</a>
    </p>
  </div>
{/if}

<flex class="questions">
  {#each mpage.messages as message}
    {#key message.date.toString()}
      <MessageRender {message} />
    {/key}
  {/each}
</flex>

{#if mpage.id !== 0}
  <div>
    <p>
      <a href="/io?page={mpage.id - 1}">see older questions</a>
    </p>
  </div>
{/if}

<style lang="scss">
  .questions {
    gap: 3rem;
  }
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

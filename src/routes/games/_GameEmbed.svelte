<script lang="ts">
  import { browser } from '$app/env';

  import Button from '$lib/components/Button.svelte';
  import { onDestroy, onMount } from 'svelte';
  import Portal from 'svelte-portal/src/Portal.svelte';
  import { run } from 'svelte/internal';

  export let src: string;

  const PLAYING_HASH = '#running';

  let running = false;

  function updateDocumentInertState() {
    const root = document.querySelector('#root');
    if (running) {
      root.setAttribute('inert', '');
    } else {
      root.removeAttribute('inert');
    }
  }

  function hashchange() {
    if (location.hash === PLAYING_HASH) {
      running = true;
    } else {
      running = false;
    }
  }

  $: browser && running && updateDocumentInertState();

  function start() {
    history.pushState(null, '', location.pathname + PLAYING_HASH);
    running = true;
  }

  onDestroy(() => {
    if (browser) {
      document.querySelector('#root').removeAttribute('inert');
    }
  });

  onMount(hashchange);
</script>

<svelte:window on:hashchange={hashchange} />

<flex center class="embed-container">
  <flex center class="embed">
    {#if running}
      <Portal target="body">
        <iframe {src} title="Game Embed" allowfullscreen />
      </Portal>
    {:else}
      <div>
        <Button variant="accent" on:click={start}>Play Game in Browser</Button>
      </div>
    {/if}
  </flex>
</flex>

<style lang="scss">
  .embed-container {
    border: 4px solid white;
  }

  .embed {
    background: #222;
    aspect-ratio: 16/9;
    width: 100%;
  }

  iframe {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    border: none;
    width: 100%;
    height: 100%;
  }
</style>

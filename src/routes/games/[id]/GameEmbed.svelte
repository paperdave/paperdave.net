<script lang="ts">
  import { browser } from '$app/environment';
  import Button from 'src/lib/input-button/Button.svelte';
  import { onDestroy, onMount } from 'svelte';
  import Portal from 'svelte-portal/src/Portal.svelte';
  export let src: string;
  const PLAYING_HASH = '#running';
  let running = false;
  function updateDocumentInertState() {
    const root = document.querySelector('#root')!;
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
  $: browser && [running] && updateDocumentInertState();
  function start() {
    if (src.startsWith('external://')) {
      const url = src.substring('external://'.length);
      location.href = url;
      return;
    }
    history.pushState(null, '', location.pathname + PLAYING_HASH);
    running = true;
  }
  onDestroy(() => {
    if (browser) {
      document.querySelector('#root')!.removeAttribute('inert');
    }
  });
  onMount(hashchange);
</script>

<svelte:window on:hashchange={hashchange} />

<layout-flex center class="embed-container">
  <layout-flex center class="embed">
    {#if running}
      <Portal target="body">
        <iframe {src} title="Game Embed" allowfullscreen />
      </Portal>
    {:else}
      <div>
        <Button variant="primary" on:click={start}>Play Game in Browser</Button>
      </div>
    {/if}
  </layout-flex>
</layout-flex>

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

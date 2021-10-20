<script context="module" lang="ts">
  import { CanvasAPI } from './canvasApi';
  export * from './canvasApi';
</script>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/env';

  export let renderer: CanvasAPI;
  let canvas: HTMLCanvasElement;

  function resize(ev?: any) {
    renderer.width = canvas.width = canvas.offsetWidth;
    renderer.height = canvas.height = canvas.offsetHeight;
    if (ev) {
      renderer.onResize();
    }
  }

  onMount(() => {
    window.addEventListener('resize', resize);

    resize();

    renderer.setCanvas(canvas);
    renderer.setup();
    renderer.startRenderLoop();
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('resize', resize);
      renderer.stopRenderLoop();
      renderer.dispose();
    }
  });
</script>

<canvas bind:this={canvas} />

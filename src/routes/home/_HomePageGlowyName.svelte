<script lang="ts">
  import { GLFX } from '$lib/vendor/glfx';
  import { onMount } from 'svelte';

  let root: HTMLDivElement;
  let textureCanvas: HTMLCanvasElement;
  let glfxCanvas: HTMLCanvasElement;
  let glfx: any;
  let tc: CanvasRenderingContext2D;

  let unsupported = false;

  let lastScrollPos = 0;
  let mousePos = { x: 0, y: 0 };

  let requested = false;
  let requestMap = new Map();

  function debouncedAnimationFrame(id: string, fn: () => void) {
    requestMap.set(id, fn);
    if (!requested) {
      requested = true;
      requestAnimationFrame(() => {
        requestMap.forEach((fn) => fn());
        requestMap.clear();
        requested = false;
      });
    }
  }

  onMount(() => {
    textureCanvas.width = glfxCanvas.width = textureCanvas.clientWidth;
    textureCanvas.height = glfxCanvas.height = textureCanvas.clientHeight;

    try {
      glfx = GLFX(glfxCanvas);
    } catch {
      unsupported = true;
      return;
    }

    tc = textureCanvas.getContext('2d')!;
    if (!tc) {
      unsupported = true;
      return;
    }

    repaintCanvas();

    lastScrollPos = window.scrollY;
  });

  function repaintCanvas() {
    tc.clearRect(0, 0, textureCanvas.width, textureCanvas.height);
    tc.fillStyle = '#fff';
    tc.textAlign = 'center';
    tc.textBaseline = 'middle';
    tc.font = getComputedStyle(root).font;
    tc.fillText('dave caruso', textureCanvas.width / 2, textureCanvas.height / 2 + 5);

    const canvasBounds = textureCanvas.getBoundingClientRect();
    const canvasPos = {
      x: canvasBounds.x + textureCanvas.width / 2,
      y: canvasBounds.y + (window.scrollY ?? 0) + textureCanvas.height / 2,
    };

    const blurAmount = Math.min(
      Math.hypot(canvasPos.x - mousePos.x, (canvasPos.y - mousePos.y) * 2) ** 0.6 / 1000,
      0.3
    );

    const blurPos = {
      x: mousePos.x - canvasPos.x + textureCanvas.width / 2,
      y: mousePos.y - canvasPos.y + textureCanvas.height / 2,
    };

    const texture = glfx.texture(textureCanvas);
    glfx.draw(texture).zoomBlur(blurPos.x, blurPos.y, blurAmount).brightnessContrast(3, 0).update();
    texture.destroy();
  }

  function resizeHandler() {
    debouncedAnimationFrame('resize', () => {
      textureCanvas.width = glfxCanvas.width = textureCanvas.clientWidth;
      textureCanvas.height = glfxCanvas.height = textureCanvas.clientHeight;
    });
    debouncedAnimationFrame('z_repaint', repaintCanvas);
  }

  function scrollHandler(ev: Event) {
    debouncedAnimationFrame('scroll', () => {
      mousePos.y += window.scrollY - lastScrollPos;
      lastScrollPos = window.scrollY;
    });
    debouncedAnimationFrame('z_repaint', repaintCanvas);
  }

  function mouseMoveHandler(ev: MouseEvent) {
    debouncedAnimationFrame('mouse', () => {
      mousePos = { x: ev.pageX, y: ev.pageY };
    });
    debouncedAnimationFrame('z_repaint', repaintCanvas);
  }
</script>

<svelte:window
  on:resize={resizeHandler}
  on:mousemove={mouseMoveHandler}
  on:scroll={scrollHandler} />

<div bind:this={root}>
  dave caruso
  {#if !unsupported}
    <canvas class="texture" bind:this={textureCanvas} />
    <canvas class="glfx" bind:this={glfxCanvas} />
  {/if}
</div>

<style lang="scss">
  div {
    position: relative;
    font-size: 5rem;
    margin-left: 6rem;
  }
  canvas {
    position: absolute;
    top: -10rem;
    left: -10rem;
    width: calc(100% + 20rem);
    height: calc(100% + 20rem);
    pointer-events: none;
  }
  .texture {
    visibility: hidden;
  }
</style>

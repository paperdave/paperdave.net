<script lang="ts">
  import { browser } from '$app/env';
  import { onDestroy, onMount } from 'svelte';
  import { easePolyInOut } from 'd3-ease';

  let canvas: null | HTMLCanvasElement = null;
  let ctx: null | CanvasRenderingContext2D = null;
  let running = false;
  let showDiv = false;

  let offsetX = 0;
  let offsetY = -75;

  const WAIT_TIME = 3500;
  const ROTATE_TIME = 6000;
  const SINGLE_ROTATE_TIME = 500;

  let animationState: 'waiting' | 'rotating' = 'waiting';
  let stateTime = 4000;

  let flippedColors = false;

  const colors = ['#e08ac8', '#E49AD0'];

  onMount(() => {
    ctx = canvas!.getContext('2d')!;
    running = true;
    requestAnimationFrame(render);
  });
  onDestroy(() => {
    running = false;
  });

  let lastTime = -1;
  function render(time: number) {
    if (!running) return;
    requestAnimationFrame(render);
    let dt = time - lastTime;
    lastTime = time;
    if (lastTime === -1) {
      offsetX = parseFloat(
        getComputedStyle(document.querySelector('#homepageaboutmarker')!)
          .transform.split(',')[4]
          .trim()
      );
      return;
    }

    if (!ctx) return;
    if (!canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    offsetX += (dt / 1000) * (200 / 25);
    offsetX = ((offsetX + 100) % 200) - 100;

    stateTime += dt;

    if (animationState === 'waiting') {
      if (stateTime > WAIT_TIME) {
        animationState = 'rotating';
        stateTime = 0;
      }
    } else if (animationState === 'rotating') {
      if (stateTime > ROTATE_TIME) {
        flippedColors = !flippedColors;
        animationState = 'waiting';
        stateTime = 0;
      }
    }

    ctx.fillStyle = flippedColors ? colors[1] : colors[0];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = flippedColors ? colors[0] : colors[1];

    let flip = false;
    for (let y = 0; y < canvas.height - offsetY + 100; y += 100) {
      let lineOffsetX = flip ? offsetX + 50 : offsetX;
      for (let x = 0; x < canvas.width - offsetX; x += 100) {
        ctx.translate(x + lineOffsetX, y + offsetY);
        if (animationState === 'rotating') {
          let influence = (x + lineOffsetX + y + offsetY) / (canvas.width + canvas.height);
          let startTime = (ROTATE_TIME - SINGLE_ROTATE_TIME * 2) * influence;
          let endTime = startTime + SINGLE_ROTATE_TIME;
          let t =
            stateTime < startTime
              ? 0
              : stateTime > endTime
              ? 1
              : easePolyInOut((stateTime - startTime) / SINGLE_ROTATE_TIME);
          ctx.rotate(t * Math.PI);

          // ctx.rotate(angle);
        }

        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.lineTo(50, 0);
        ctx.lineTo(100, 100);
        ctx.closePath();
        ctx.fill();

        ctx.resetTransform();
      }
      flip = !flip;
    }
  }
</script>

{#if browser}
  <canvas bind:this={canvas} />
{/if}
{#if showDiv}
  <div id="homepageaboutmarker" />
{/if}

<style>
  canvas,
  div {
    position: absolute;
    top: 0;
    left: -200px;
    width: calc(100% + 200px);
    height: 100%;
  }

  div {
    background: url('/assets/home/Triangles.svg');
    background-position: 0 -50%;
    animation: move-background-left 25s infinite linear;
  }

  @keyframes move-background-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(200px);
    }
  }
</style>

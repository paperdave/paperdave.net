<script lang="ts">
  import { onMount } from 'svelte';
</script>

<div class="root">
  <div class="layer layer1" />
  <div class="layer layer3" />
  <div class="layer layer2" />

  <div class="item tree1" style="--x:21rem" />
  <div class="item tree2" style="--x:38rem;width:12rem" />
  <div class="item tree2" style="--x:-45rem" />
  <div class="item tree1" style="--x:-60rem;width:15rem" />

  <div class="item rock" style="--x:-43rem;width:2rem" />
  <div class="item rock" style="--x:-34rem;width:4rem" />
  <div class="item rock" style="--x:-12rem;width:2rem" />
  <div class="item rock" style="--x:5rem" />
  <div class="item rock" style="--x:30rem;width:2rem" />
  <div class="item rock" style="--x:38rem;width:4rem" />
</div>

<style>
  .root {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .layer {
    position: absolute;
    left: -256px;
    top: -256px;
    right: -256px;
    bottom: -256px;
  }

  .layer1 {
    background-image: url('/assets/home/CheckerLayer1.svg');
    mix-blend-mode: lighten;
    opacity: 0.4;
    animation: moveAnimation 20s linear infinite;
    --dx: -128px;
    --dy: -64px;
  }

  .layer2 {
    background-image: url('/assets/home/CheckerLayer2.svg');
    mix-blend-mode: darken;
    filter: blur(5px);
    opacity: 0.3;
    animation: moveAnimation 34s linear infinite;
    background-position: 16px 16px;
    --dx: -256px;
    --dy: -192px;
  }

  .layer3 {
    background-image: url('/assets/home/CheckerLayer3.svg');
    mix-blend-mode: hard-light;
    filter: blur(4px);
    opacity: 0.6;
    animation: moveAnimation 25s linear infinite;
    --dx: -192px;
    --dy: 192px;
  }

  @keyframes moveAnimation {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(var(--dx), var(--dy));
    }
  }

  .item {
    position: absolute;
    aspect-ratio: 138/266;
    width: 10rem;
    bottom: 0;
    left: calc(50% + var(--x));
    opacity: 0.9;
  }

  .tree1 {
    background-image: url('/assets/home/Tree1.svg');
  }
  .tree2 {
    background-image: url('/assets/home/Tree2.svg');
  }

  .rock {
    width: 3rem;
    aspect-ratio: 21.78/12.04;
    background-image: url('/assets/home/Rock.svg');
  }
</style>

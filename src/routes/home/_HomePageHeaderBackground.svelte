<script lang="ts">
  import { onMount } from 'svelte';
</script>

<div class="root">
  <div class="layer layer1"></div>
  <div class="layer layer3"></div>
  <div class="layer layer2"></div>
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

  .root {
    z-index: -1;
  }

  .layer1 {
    background-image: url("/assets/home/CheckerLayer1.svg");
    mix-blend-mode: lighten;
    opacity: 0.4;
    animation: moveAnimation 20s linear infinite;
    --dx: -128px;
    --dy: -64px;
  }

  .layer2 {
    background-image: url("/assets/home/CheckerLayer2.svg");
    mix-blend-mode: darken;
    filter: blur(5px);
    opacity: 0.3;
    animation: moveAnimation 34s linear infinite;
    background-position: 16px 16px;
    --dx: -256px;
    --dy: -192px;
  }

  .layer3 {
    background-image: url("/assets/home/CheckerLayer3.svg");
    mix-blend-mode: hard-light;
    filter: blur(4px);
    opacity: 0.6;
    animation: moveAnimation 25s linear infinite;
    --dx: -192px;
    --dy: 192px;
  }

  @keyframes moveAnimation {
    0% { transform: translate(0, 0); }
    100% { transform: translate(var(--dx), var(--dy)); }
  }
</style>
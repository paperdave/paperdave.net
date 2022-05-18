<script lang="ts">
  import Img from '$lib/components/Img.svelte';
  import type { Game } from '@prisma/client';

  export let game: Game;
</script>

<a sveltekit:prefetch href="/games/{game.id}" class="custom">
  <div class="bg" aria-hidden="true">
    <Img src={game.banner} alt="" />
  </div>
  <div class="data">
    <div class="logo">
      {#if game.logo}
        <Img src={game.logo} alt="" noBlurhash />
      {:else}
        {game.title}
      {/if}
    </div>
  </div>
</a>

<style lang="scss">
  .custom {
    position: relative;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    background: #222;
    aspect-ratio: 4;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.25;
      z-index: 2;
      transition: opacity 0.2s ease-in-out;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 30%,
        rgba(0, 0, 0, 0) 50%
      );
      width: 100%;
      height: 100%;
      content: '';
    }
    &:hover::after {
      opacity: 0.4;
    }
    &:active::after {
      opacity: 0.6;
      transition-duration: 0.1s;
    }
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .data {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    z-index: 3;
    padding-left: 2rem;
    width: 100%;
    height: 100%;
  }
  .logo {
    height: 60%;
    & :global(img) {
      height: 100%;
    }
  }
</style>

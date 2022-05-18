<script lang="ts">
  import Img from '$lib/components/Img.svelte';
  import { formatDate } from '$lib/utils/date';
  import type { Game } from '@prisma/client';

  export let game: Game;

  $: ariaLabel =
    game.title +
    (game.description ? `: ${game.description}` : '') +
    '. Released on ' +
    formatDate(game.date, 'date');
</script>

<a sveltekit:prefetch href="/games/{game.id}" class="custom" aria-label={ariaLabel}>
  <div class="bg">
    <Img src={game.banner} alt={game.title} fit="cover" />
  </div>
  <div class="state" />
  <div class="borders" />
  <div class="gradient" />
  <div class="content">
    <div class="left">
      <div class="logo">
        {#if game.logo}
          <Img src={game.logo} alt={game.title} noDrag noBlur stretch="height" absolute />
        {:else}
          {game.title}
        {/if}
      </div>
      {#if game.shortDescription}
        <p>{game.shortDescription}</p>
      {/if}
    </div>
    <div class="right">
      <time>
        {formatDate(game.date, 'date')}
      </time>
    </div>
  </div>
</a>

<style lang="scss">
  a {
    --x: 0 0 0.25rem #000;
    position: relative;
    transition: height 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
    height: 12rem;
    overflow: hidden;
    color: white;
    text-shadow: var(--x), var(--x), var(--x), var(--x), var(--x), var(--x), var(--x), var(--x);

    &:hover,
    &:focus {
      height: 15rem;
    }
  }

  a > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .gradient {
    background: linear-gradient(
      to right,
      hsla(var(--bg), 0.9) 0%,
      transparent 10%,
      transparent 90%,
      hsla(var(--bg), 0.9) 100%
    );
  }

  .borders {
    border-top: 1px solid hsl(var(--fg));
    border-bottom: 2px solid hsl(var(--fg));
  }

  a:first-of-type .borders {
    border-top: 2px solid hsl(var(--fg));
  }

  .bg {
    filter: saturate(0.8);
    transition: filter 100ms ease-in-out;

    a:hover &,
    a:focus & {
      filter: saturate(1);
    }
  }

  .state {
    transition: background-color 100ms ease-in-out;
    background: hsla(var(--bg), 0.3);

    a:hover &,
    a:focus & {
      background: hsla(var(--bg), 0.1);
    }

    a:active & {
      background: hsla(var(--fg), 0.2);
    }
  }

  .content {
    display: flex;
    padding: 2rem;
  }

  .left {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1rem;
    height: 100%;

    .logo {
      display: grid;
      position: relative;
      flex: 1 0 0;
    }
  }

  .spacer {
    flex: 1;
  }

  time {
    font-weight: bold;
  }
</style>

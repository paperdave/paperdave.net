<script lang="ts">
  import dayjs from 'dayjs';
  import Img from 'src/components/LegacyImg.svelte';
  import type { GamePartial } from './+page.server';

  export let game: GamePartial;

  $: date = dayjs(game.date).format('YYYY-MM-DD');
  $: ariaLabel =
    game.title +
    (game.shortDescription ? `: ${game.shortDescription}` : '') +
    '. Released on ' +
    date;
</script>

<a href="/games/{game.id}" class="custom" aria-label={ariaLabel}>
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
          <div class="text">
            {game.title}
          </div>
        {/if}
      </div>
      {#if game.shortDescription}
        <p>{game.shortDescription}</p>
      {/if}
    </div>
    <div class="right">
      <time>{date}</time>
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
      rgba(var(--bg), 0.9) 0%,
      transparent 10%,
      transparent 90%,
      rgba(var(--bg), 0.9) 100%
    );
  }

  .borders {
    border-top: 1px solid rgb(var(--on-bg));
    border-bottom: 2px solid rgb(var(--on-bg));
  }

  a:first-of-type .borders {
    border-top: 2px solid rgb(var(--on-bg));
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
    background: rgba(var(--bg), 0.3);

    a:hover &,
    a:focus & {
      background: rgba(var(--bg), 0.1);
    }

    a:active & {
      background: rgba(var(--on-bg), 0.2);
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
  }

  .logo {
    display: grid;
    position: relative;
    flex: 1 0 0;

    .text {
      transform-origin: top left;
      transition: transform 250ms cubic-bezier(0.165, 0.84, 0.44, 1);
      max-width: 50%;
      font-weight: 700;
      font-size: 2.4rem;

      a:hover &,
      a:focus & {
        transform: scale(1.4);
      }
    }
  }

  .spacer {
    flex: 1;
  }

  time {
    font-weight: bold;
  }
</style>

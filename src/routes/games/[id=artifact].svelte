<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';

  import Button from '$lib/components/Button.svelte';
  import Img from '$lib/components/Img.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
  import type { Game } from '@prisma/client';
  import GameEmbed from './_GameEmbed.svelte';

  export let game: Game;
</script>

<ThemeRoot
  foreground={game.themeFG}
  background={game.themeBG}
  accent={game.themeAccent ?? palette.green[500]}>
  <Paper>
    <header>
      <Img src={game.banner} alt="" absolute />
      <div class="logo">
        <Img src={game.logo} alt="" stretch="height" noBlur />
      </div>
    </header>
    <BackButton position="corner" opaque href="/games">all games</BackButton>

    {#if game.web}
      <GameEmbed src={game.web} />
    {/if}

    <p>
      {game.description}
    </p>
  </Paper>
</ThemeRoot>

<style lang="scss">
  header {
    display: flex;
    position: relative;
    left: -25%;
    justify-content: center;
    margin-bottom: 4rem;
    background-color: black;
    aspect-ratio: 4;
    width: 150%;
  }
  .logo {
    position: absolute;
    bottom: -4rem;
    height: 8rem;
  }
</style>

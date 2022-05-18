<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';

  import Button from '$lib/components/Button.svelte';

  import ButtonRow from '$lib/components/ButtonRow.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Img from '$lib/components/Img.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
  import type { Game } from '@prisma/client';

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
        <Img src={game.logo} alt="" stretch="height" />
      </div>
    </header>
    <BackButton position="corner" opaque href="/games">all games</BackButton>

    <p>
      {game.description}
    </p>

    <div class="embed">
      <div>
        <Button variant="accent">Play Game in Browser</Button>
      </div>
    </div>
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
  .embed {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid white;
    background: #222;
    aspect-ratio: 16/9;
  }
</style>

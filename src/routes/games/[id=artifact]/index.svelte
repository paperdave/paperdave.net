<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';

  import Img from '$lib/components/Img.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
  import type { Game } from '@prisma/client';
  import { Markdown } from 'svelte-simple-markdown';
  import GameEmbed from '../_GameEmbed.svelte';
  import { markdownConfig } from '$lib/markdown';
  import ClickableImg from '$lib/components/ClickableImg.svelte';
  import { getTypedGameDownloads, type GameDownload } from '../_game-utils';
  import ButtonRow from '$lib/components/ButtonRow.svelte';
  import Button from '$lib/components/Button.svelte';

  export let game: Game;

  function getPlatformName(str: GameDownload['platform']) {
    if (str === 'win') return 'Windows';
    if (str === 'linux') return 'Linux';
    return 'Other Download';
  }
</script>

<ThemeRoot
  foreground={game.themeFG}
  background={game.themeBG}
  accent={game.themeAccent ?? palette.green[500]}>
  <Paper>
    <header>
      <Img src={game.banner} alt="{game.title} Banner" absolute />
      <div class="logo">
        {#if game.logo}
          <Img src={game.logo} alt={game.title} stretch="height" noBlur />
        {:else}
          <div class="text">{game.title}</div>
        {/if}
      </div>
    </header>
    <BackButton position="corner" opaque href="/games">all games</BackButton>

    {#if game.web}
      <GameEmbed src={game.web} />
    {/if}

    {#if game.screenshots.length > 0}
      <flex row gap class="screenshots">
        {#each game.screenshots as screenshot}
          <div class="img">
            <ClickableImg src={screenshot} alt="{game.title} Screenshot" stretch="height" />
          </div>
        {/each}
      </flex>
    {/if}

    {#if game.downloads.length > 0}
      <ButtonRow>
        <span><strong>Download for:</strong></span>
        {#each getTypedGameDownloads(game) as download}
          <Button href={download.url} variant="accent">
            {getPlatformName(download.platform)} (.{download.url.split('.').pop()})
          </Button>
        {/each}
      </ButtonRow>
    {/if}

    <Markdown config={markdownConfig} value={game.description} />

    {#if game.source}
      <p>
        <a href={game.source}>Source Code</a>
      </p>
    {/if}
  </Paper>
</ThemeRoot>

<style lang="scss">
  header {
    display: flex;
    position: relative;
    left: -25%;
    justify-content: center;
    margin-bottom: 4rem;
    aspect-ratio: 4;
    width: 150%;
  }
  .logo {
    position: absolute;
    bottom: -4rem;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    --x: 0 0 0.25rem hsl(var(--bg));
    text-shadow: var(--x), var(--x), var(--x), var(--x), var(--x), var(--x), var(--x), var(--x);
  }
  .screenshots {
    height: 6rem;
    overflow-x: auto;
    &.span {
      flex: 1;
    }
  }
</style>

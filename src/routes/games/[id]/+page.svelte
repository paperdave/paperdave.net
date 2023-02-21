<script lang="ts">
  import { Markdown } from 'svelte-simple-markdown';
  import GameEmbed from './GameEmbed.svelte';
  import { defaultMarkdownConfig } from 'src/markdown';
  import { getTypedGameDownloads, type GameDownload } from '../utils';
  import Img from 'src/components/LegacyImg.svelte';
  import type { PageData } from './$types';
  import Link from 'src/lib/link/Link.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import Button from 'src/lib/input-button/Button.svelte';
  export let data: PageData;
  $: game = data.game;
  function getPlatformName(str: GameDownload['platform']) {
    if (str === 'win') return 'Windows';
    if (str === 'linux') return 'Linux';
    return 'Other Download';
  }
</script>

<ThemeRoot
  foreground={game.themeFG ?? undefined}
  background={game.themeBG ?? undefined}
  primary={game.themeAccent ?? undefined}
>
  <layout-container size="normal">
    <header>
      {#if game.banner}
        <Img src={game.banner} alt="{game.title} Banner" absolute />
      {/if}
      <div class="logo">
        {#if game.logo}
          <Img src={game.logo} alt={game.title} stretch="height" noBlur />
        {:else}
          <div class="text">{game.title}</div>
        {/if}
      </div>
    </header>

    {#if game.web}
      <GameEmbed src={game.web} />
    {/if}

    {#if game.screenshots.length > 0}
      <layout-flex row gap class="screenshots">
        {#each game.screenshots as screenshot}
          <div class="img">
            <Img src={screenshot} alt="{game.title} Screenshot" stretch="height" />
          </div>
        {/each}
      </layout-flex>
    {/if}

    {#if game.downloads.length > 0}
      <layout-button-row>
        <span><strong>Download for:</strong></span>
        {#each getTypedGameDownloads(game) as download}
          <Button href={download.url} variant="primary">
            {getPlatformName(download.platform)} (.{download.url.split('.').pop()})
          </Button>
        {/each}
      </layout-button-row>
    {/if}

    <Markdown config={defaultMarkdownConfig} value={game.description} />

    {#if game.source}
      <p>
        <Link href={game.source}>Source Code</Link>
      </p>
    {/if}
  </layout-container>
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
    --x: 0 0 0.25rem rgb(var(--bg));
    text-shadow: var(--x), var(--x), var(--x), var(--x), var(--x), var(--x), var(--x), var(--x);
  }
  .screenshots {
    height: 6rem;
    overflow-x: auto;
  }
  layout-container {
    margin-top: -1rem;
    z-index: -1;
  }
</style>

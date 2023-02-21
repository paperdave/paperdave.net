<script lang="ts">
  import BackButton from 'src/components/BackButton.svelte';
  import IconButtonImg from 'src/components/IconButtonImg.svelte';
  import Button from 'src/lib/input-button/Button.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import type { PageData } from './$types';
  import Album from './Album.svelte';
  import { playAll } from './player';

  export let data: PageData;
</script>

<!-- nested comments when -->
<ThemeRoot background="#53559E" primary="#78FF86">
  <layout-container style:--size="50rem" size>
    <layout-container size="normal">
      <BackButton />
      <h1>music</h1>
      <p>
        everything here was made with love. download mp3/flac if you want, or just chillax here.
      </p>
      <layout-flex row class="row1">
        <layout-button-row>
          <Button on:click={playAll}>Play All</Button>
          <!-- <Button href="/music/download" disabled>Download All (soon)</Button> -->
        </layout-button-row>
        <layout-flex row>
          <div class="external-header">Listen externally:</div>
          <IconButtonImg href="/spotify" variant="subtle">
            <img src="/social-icon/Spotify.svg" alt="Listen on Spotify" />
          </IconButtonImg>
          <IconButtonImg href="/apple-music" variant="subtle">
            <img src="/social-icon/AppleMusic.svg" alt="Listen on Apple Music" />
          </IconButtonImg>
          <IconButtonImg href="https://paperdave.bandcamp.com/" variant="subtle">
            <img src="/social-icon/Bandcamp.svg" alt="Listen on Apple Music" />
          </IconButtonImg>
        </layout-flex>
      </layout-flex>
    </layout-container>
    {#each data.albums as year}
      <h2>{year.key}</h2>

      {#each year.items as album}
        <Album {album} />
      {/each}
    {/each}
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 6rem;
    font-weight: 800;
    margin: 0;
    margin-bottom: -1rem;
    @include shadow(#0e121d, 6);
  }
  h2 {
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    margin: 0;
    @include shadow(#0e121d, 2);
  }
  .row1 {
    justify-content: space-between;
  }
  @media (max-width: 630px) {
    .row1 {
      flex-direction: column;
      gap: 1rem;
    }
  }
  .external-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5rem;
    white-space: nowrap;
  }
</style>

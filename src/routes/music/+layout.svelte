<script lang="ts">
  import { getCdnImageSrcSet, parseImageId } from 'src/cdn';
  import Image from 'src/components/Image.svelte';
  import { formatDuration } from 'src/date';
  import { onDestroy } from 'svelte';
  import type { LayoutData } from './$types';
  import {
    setPlaylist,
    musicPlayerCurrentSong,
    musicPlayerCurrentTime,
    playerNext,
    playerPrev,
    playerPause,
    playerStop
  } from './player';

  export let data: LayoutData;

  const playlist = data.albums
    .flatMap((x) => x.items)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  setPlaylist(playlist);

  let musicPlayerOpen = false;
  $: $musicPlayerCurrentSong && (musicPlayerOpen = true);

  $: album = playlist.find((a) => a.songs.some((s) => s === $musicPlayerCurrentSong?.data));

  onDestroy(() => {
    playerStop();
  });
</script>

<slot />

{#if musicPlayerOpen}
  <div id="player">
    <layout-container size="normal">
      <layout-flex>
        <div class="song-info">
          <div class="song-img">
            {#if album?.art}
              {@const { key: albumArt, blurhash } = parseImageId(album.art)}
              <Image
                src={getCdnImageSrcSet(albumArt, 'album', 1000)}
                alt="{album.title} album art"
                {blurhash}
              />
            {/if}
          </div>
          <div class="song-text-info">
            {#if $musicPlayerCurrentSong}
              <strong class="song-title" class:small={album?.type !== 'Song'}
                >{$musicPlayerCurrentSong.data.title}</strong
              >
              {#if album?.type !== 'Song'}
                <span class="album-title">{album?.title}</span>
              {/if}
            {/if}
          </div>
        </div>

        <layout-button-row>
          <button on:click={playerPrev}>prev</button>
          <button on:click={playerPause}>play pause</button>
          <button on:click={playerNext}>next</button>
        </layout-button-row>

        <layout-flex row class="row3">
          <div>
            {formatDuration($musicPlayerCurrentTime)}
          </div>

          <div
            class="progress-wrapper"
            style:--left="{($musicPlayerCurrentTime /
              ($musicPlayerCurrentSong?.data.duration ?? 1)) *
              100 -
              100}%"
          >
            <div class="progress">
              <div class="bar" />
            </div>
            <div class="dot" />
          </div>

          {#if $musicPlayerCurrentSong}
            <div>
              {formatDuration($musicPlayerCurrentSong.data.duration)}
            </div>
          {/if}
        </layout-flex>
      </layout-flex>
    </layout-container>
  </div>
{/if}

<style lang="scss">
  #player {
    position: fixed;
    bottom: -2px;
    left: -2px;
    width: calc(100% + 4px);

    display: flex;
    flex-direction: column;
    background-color: #1f1234;
    border-radius: 10px 10px 0 0;
    border: 2px solid #000000;
    color: white;

    z-index: 100;

    layout-container {
      margin: 1rem;
    }
  }

  .progress-wrapper {
    flex: 1;
    height: 10px;
    position: relative;
  }
  .progress {
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 5px;
    overflow: hidden;
  }

  .bar {
    height: 10px;
    background-color: #db4fd2;
    border-radius: 5px;
    width: 100%;
    transform: translateX(calc(var(--left)));
  }

  .dot {
  }

  .song-info {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .row3 {
    align-items: center;
    gap: 0.5rem;
  }

  .song-title {
    font-size: 3rem;

    &.small {
      font-size: 2rem;
    }
  }
  .song-text-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .song-img {
    width: 64px;
    height: 64px;
    flex: 0 0 64px;
    aspect-ratio: 1;
    position: relative;
    border: 2px solid white;
  }
  @media (min-width: 1000px) {
    .song-img {
      width: 96px;
      height: 96px;
    }
  }
</style>

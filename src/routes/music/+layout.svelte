<script lang="ts">
  import { getCdnImageSrcSet, parseImageId } from 'src/cdn';
  import Image from 'src/components/Image.svelte';
  import { formatDuration } from 'src/date';
  import type { LayoutData } from './$types';
  import {
    setPlaylist,
    musicPlayerCurrentSong,
    musicPlayerCurrentTime,
    playerNext,
    playerPrev,
    playerPause
  } from './player';

  export let data: LayoutData;

  const playlist = data.albums
    .flatMap((x) => x.items)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  setPlaylist(playlist);

  let musicPlayerOpen = false;
  $: $musicPlayerCurrentSong && (musicPlayerOpen = true);

  $: album = playlist.find((a) => a.songs.some((s) => s === $musicPlayerCurrentSong?.data));
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

        <div>
          <div>
            {formatDuration($musicPlayerCurrentTime)}
          </div>

          <div class="progress">
            <div
              class="bar"
              style:width="{($musicPlayerCurrentTime /
                ($musicPlayerCurrentSong?.data.duration ?? 0)) *
                100}%"
            />
          </div>

          {#if $musicPlayerCurrentSong}
            <div>
              {formatDuration($musicPlayerCurrentSong.data.duration)}
            </div>
          {/if}
        </div>
      </layout-flex>
    </layout-container>
  </div>
{/if}

<style lang="scss">
  #player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    background-color: #191231;
    border-radius: 10px 10px 0 0;
    border: 2px solid #010002;
    color: #c6f7ff;

    z-index: 100;

    layout-container {
      margin: 1rem;
    }
  }

  .progress {
    height: 4px;
    background-color: red;
  }

  .bar {
    height: 4px;
    background-color: orange;
  }

  .song-info {
    display: flex;
    gap: 1rem;
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
  }

  .song-img {
    width: 64px;
    height: 64px;
    position: relative;
  }
</style>

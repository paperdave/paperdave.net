<script lang="ts">
  import { getCdnImageSrcSet, parseImageId } from 'src/cdn';
  import Image from 'src/components/Image.svelte';
  import { formatDate, formatDuration } from 'src/date';
  import Button from 'src/lib/input-button/Button.svelte';
  import { Markdown } from 'svelte-simple-markdown';
  import { genericMarkdown } from '../q+a/_lib/markdown';
  import type { PageData } from './$types';
  import { playKey, musicPlayerCurrentSong, replacePlaylistWithKeys, playerPause } from './player';

  export let album: PageData['albums'][0]['items'][number];

  let duration = album.songs.map((x) => x.duration).reduce((a, b) => a + b, 0);
</script>

<section class:playingAlbum={album.songs.some((x) => $musicPlayerCurrentSong?.data === x)}>
  <header>
    <div class="img">
      {#if album.art}
        {@const { key: albumArt, blurhash } = parseImageId(album.art)}
        <Image
          src={getCdnImageSrcSet(albumArt, 'album', 1000)}
          alt="{album.title} album art"
          {blurhash}
        />
      {:else}
        <div>no art</div>
      {/if}
    </div>
    <div class="details">
      <h3>{album.title}</h3>
      <div class="stats">
        {formatDate(album.date, 'date')} • {album.type.toLowerCase()} • {formatDuration(duration)}
      </div>
      {#if album.desc}
        <div>{album.desc}</div>
      {/if}
      <div>
        <Button on:click={() => replacePlaylistWithKeys(album.songs.map((x) => x.media ?? ''))}
          >Play</Button
        >
      </div>
    </div>
  </header>
  {#if album.type !== 'Song'}
    <ul>
      {#each album.songs as song, i}
        <li
          class:playingSong={$musicPlayerCurrentSong?.data === song}
          on:click={() => {
            if ($musicPlayerCurrentSong?.data === song) {
              playerPause();
            } else {
              playKey(song.media ?? '');
            }
          }}
        >
          <div class="song-item-number">{i + 1}</div>
          <div class="song-title">{song.title}</div>
          <div class="song-duration">{formatDuration(song.duration)}</div>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    background-color: #221a40;
    border-radius: 10px;
    border: 2px solid #010002;
  }
  header {
    display: flex;
    flex-direction: row;
    padding: 1rem;
    gap: 1rem;
  }
  .img {
    flex: 0 0 200px;
    aspect-ratio: 1/1;
    background-color: #53559e;
    display: grid;
    border: 2px solid #010002;
  }
  .img {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .stats {
    color: rgba(255, 255, 255, 0.6);
  }
  h3 {
    font-size: 2rem;
    font-weight: 800;
    margin: 0;
  }

  ul {
    display: flex;
    flex-direction: column;
    padding: 0 1rem 0.5rem 1rem;
    margin: 0;
    margin-top: -0.5rem;
    list-style: none;
  }

  li {
    display: flex;
    height: 48px;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
    padding: 0 1rem;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    &:active .song-title {
      font-weight: 700;
    }
  }

  .song-title {
    flex: 1;
    transition: font-weight 50ms ease-in-out;
  }

  .song-item-number {
    display: flex;
    width: 1rem;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    opacity: 0.5;
  }

  .playingAlbum {
    border-color: #db4fd2;
    background-color: #2a1331;
    position: relative;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: 'Now Playing!';
      z-index: inherit;
      transform: translate(1rem, -50%);
      background-color: #db4fd2;
      padding: 0.2rem 0.5rem;
      border-radius: 8px;
    }
  }

  .playingSong {
    color: #ff4bf3;

    .song-title {
      font-weight: 700;
    }
  }
</style>

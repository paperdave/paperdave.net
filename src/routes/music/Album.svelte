<script lang="ts">
  import { getCdnImageSrcSet, getCdnSongStreamURLs } from 'src/cdn';
  import { formatDate, formatDuration } from 'src/date';
  import type { PageData } from './$types';

  export let album: PageData['albums'][0]['items'][number];

  let duration = album.songs.map((x) => x.duration).reduce((a, b) => a + b, 0);
</script>

<section>
  <header>
    <div class="img">
      {#if album.art}
        <img srcset={getCdnImageSrcSet(album.art, 'album', 1000)} alt="{album.title} album art" />
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
    </div>
  </header>
  {#if album.type !== 'Song'}
    <ul>
      {#each album.songs as song, i}
        <li>
          <div>{i + 1}</div>
          <div>{song.title}</div>
          <div>{formatDuration(song.duration)}</div>
        </li>
        {#if song.media}
          <audio controls>
            {#each getCdnSongStreamURLs(song.media) as { url, type }}
              <source src={url} {type} />
            {/each}
          </audio>
        {/if}
      {/each}
    </ul>
  {:else if album.songs[0].media}
    <audio controls loop={album.songs[0].tags.includes('loop')}>
      {#each getCdnSongStreamURLs(album.songs[0].media) as { url, type }}
        <source src={url} {type} />
      {/each}
    </audio>
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
  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  .action-row {
    display: flex;
    flex-direction: row;
    height: 48px;
  }
</style>

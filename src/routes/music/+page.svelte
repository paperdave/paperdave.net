<script lang="ts">
  import { getCdnSongFullMetaURL } from 'src/cdn';
  import { formatDate } from 'src/date';
  import Link from 'src/lib/link/Link.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<!-- nested comments when -->
<ThemeRoot background="#53559E" primary="#78FF86">
  <layout-container>
    <h1>music</h1>
    <p>mmmmmm crunchy music crunch that music mmmm</p>
    {#each data.albums as year}
      <h2>{year.key}</h2>

      {#each year.items as album}
        {#if album.single}
          {@const song = album.songs[0]}

          <div class="album">
            <h3>{album.title}</h3>
            <p>{formatDate(song.date, 'date')}</p>
            <p>
              <Link href={getCdnSongFullMetaURL(song.media)}>{song.media}</Link>
            </p>
            <!-- <img srcset={getCdnImageSrcSet(album.art, 'album', 1000)} alt="{album.title} album art" /> -->
            <ul>
              {#each song.tags as tags}
                <li>{tags}</li>
              {/each}
            </ul>
          </div>
        {:else}
          <h2>TODO: album view</h2>
        {/if}
      {/each}
    {/each}
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 4rem;
    font-weight: 800;
    margin: 0;
    @include shadow(#0e121d, 6);
  }
</style>

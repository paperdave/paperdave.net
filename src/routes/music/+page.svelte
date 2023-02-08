<script lang="ts">
  import { getCdnSongFullMetaURL } from 'src/cdn';
  import { formatDate } from 'src/date';
  import Link from 'src/lib/link/Link.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import type { PageData } from './$types';
  import Album from './Album.svelte';

  export let data: PageData;
</script>

<!-- nested comments when -->
<ThemeRoot background="#53559E" primary="#78FF86">
  <layout-container style:--size="50rem" size>
    <layout-container size="normal">
      <h1>music</h1>
      <p>
        everything here was made with love. download mp3/flac if you want, or just chillax here.
      </p>
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
    font-size: 4rem;
    font-weight: 800;
    margin: 0;
    @include shadow(#0e121d, 6);
  }
  h2 {
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    margin: 0;
    @include shadow(#0e121d, 2);
  }
</style>

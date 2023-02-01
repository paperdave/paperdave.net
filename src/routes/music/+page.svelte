<script lang="ts">
  import Img from 'src/components/Img.svelte';
  import { formatDate } from 'src/date';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#each data.albums as year}
  <h2>{year.key}</h2>

  {#each year.items as album}
    {#if album.single}
      {@const song = album.songs[0]}
      <h3>{album.title}</h3>
      <Img src={album.art} alt="{album.title} Album Cover" />
      <p>{formatDate(song.date, 'date')}</p>
      <p>{song.media}</p>
      <ul>
        {#each song.tags as tags}
          <li>{tags}</li>
        {/each}
      </ul>
    {:else}
      <h2>TODO: album view</h2>
    {/if}
  {/each}
{/each}

<style lang="scss">
</style>

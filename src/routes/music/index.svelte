<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import type { Music } from '@prisma/client';
  import MusicCard from './_MusicCard.svelte';

  export let music: Music[];

  $: yearSeparated = music.reduce((acc, curr) => {
    const year = new Date(curr.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(curr);
    return acc;
  }, {} as { [year: string]: Music[] });
</script>

<Meta title="music" description="i like making music, here's some of it." />

<div>
  {#each Object.entries(yearSeparated).reverse() as [year, musicList]}
    <h2>{year}</h2>
    {#each musicList as artifact}
      <MusicCard {artifact} />
    {/each}
  {/each}
</div>

<style lang="scss">
  h2 {
    color: #515025;
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;
  }
</style>

<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { MusicArtifact } from '$lib/structures';
  import BackButton from '$lib/components/BackButton.svelte';
  import MusicCard from './_MusicCard.svelte';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/music/page-data.json').then((res) => res.json());
    return {
      props: {
        music: res.map((x) => MusicArtifact.fromJSON(x)),
      },
    };
  };
</script>

<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';

  export let music: MusicArtifact[];

  $: yearSeparated = Object.entries(
    music.reduce((acc, curr) => {
      const year = curr.date.getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(curr);
      return acc;
    }, {})
  ).reverse() as [string, MusicArtifact[]][];
</script>

<Meta title="dave's music" description="i like making music, here's some of it." />

<main>
  <BackButton position="off-center" />

  <header>
    <h1>the music ♫</h1>
    <p>i like making music, here's some of it.</p>
  </header>

  {#each yearSeparated as [year, musicList]}
    <h2>{year}</h2>
    {#each musicList as artifact}
      <MusicCard {artifact} />
    {/each}
  {/each}
</main>

<style lang="scss">
  main {
    background-color: #f3efc1;
  }

  header {
    margin: 3rem;
    text-align: center;
  }

  h1 {
    line-height: 1.15em;
    font-size: 5rem;
    color: #faa719;
    text-shadow: shadow(3px, 1, #ce6807);
  }

  h2 {
    font-size: 1.5rem;
    color: #515025;
    font-weight: 500;
    text-align: center;
  }
</style>

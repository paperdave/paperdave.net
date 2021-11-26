<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { JSONData } from '$lib/structures';
  import { MusicArtifact } from '$lib/structures';
  import BackButton from '$lib/components/BackButton.svelte';
  import MusicCard from './_MusicCard.svelte';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/music/get-music').then((res) => res.json());
    return {
      props: {
        music: res.map((x: JSONData<MusicArtifact>) => MusicArtifact.fromJSON(x)),
      },
    };
  };
</script>

<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import MusicHeader from './_MusicHeader.svelte';

  export let music: MusicArtifact[];

  $: yearSeparated = music.reduce((acc, curr) => {
    const year = curr.date.getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(curr);
    return acc;
  }, {} as { [year: string]: MusicArtifact[] });
</script>

<Meta title="dave's music" description="i like making music, here's some of it." />

<BackButton position="off-center" />

<MusicHeader />

{#each Object.entries(yearSeparated).reverse() as [year, musicList]}
  <h2>{year}</h2>
  {#each musicList as artifact}
    <MusicCard {artifact} />
  {/each}
{/each}

<style lang="scss">
  h2 {
    font-size: 1.5rem;
    color: #515025;
    font-weight: 500;
    text-align: center;
  }
</style>

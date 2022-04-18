<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { MusicArtifact } from '$lib/structures';
  import BackButton from '$lib/components/BackButton.svelte';
  import MusicCard from './_MusicCard.svelte';
</script>

<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import MusicHeader from './_MusicHeader.svelte';
  import Layout from './__layout.svelte';
  import { formatDate } from '$lib/utils/date';

  export let artifact: MusicArtifact;
</script>

<Meta
  title={artifact.title + ''}
  description="music by dave caruso released on {formatDate(artifact.date, 'date')}"
  image={artifact.thumb?.url} />

<Layout>
  <BackButton position="off-center" />

  <MusicHeader />

  <p>
    <a href="/music">see all music</a>
  </p>

  <div>
    <MusicCard {artifact} />
  </div>
</Layout>

<style lang="scss">
  p {
    text-align: center;
  }
  a {
    text-decoration: underline;
  }
</style>

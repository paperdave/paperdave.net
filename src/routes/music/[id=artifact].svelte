<script context="module" lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
  import MusicCard from './_MusicCard.svelte';
</script>

<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import { formatDate } from '$lib/utils/date';
  import type { Music } from '@prisma/client';
  import { decodeImageUrl } from '$lib/utils/media-url';

  export let artifact: Music;
</script>

<Meta
  title={artifact.title + ''}
  description="music by dave caruso released on {formatDate(artifact.date, 'date')}"
  image={decodeImageUrl(artifact.album)?.url} />

<BackButton position="off-center" href="/music">all music</BackButton>

<div>
  <MusicCard {artifact} />
</div>

<style lang="scss">
  p {
    text-align: center;
  }
  a {
    text-decoration: underline;
  }
</style>

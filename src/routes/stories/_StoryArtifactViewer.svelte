<script context="module" lang="ts">
  import type { MusicArtifact } from '$lib/structures';
</script>

<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import Layout from './__layout.svelte';
  import { formatDate } from '$lib/utils/date';

  export let artifact: MusicArtifact;
</script>

<Meta
  title={artifact.title + ''}
  description="story by dave caruso released on {formatDate(artifact.date, 'date')}"
  image={artifact.thumb?.url} />

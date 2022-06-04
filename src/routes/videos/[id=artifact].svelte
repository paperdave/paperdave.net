<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import VideoPlayer from './_VideoPlayer.svelte';
  import { formatDate } from '$lib/utils/date';
  import type { Video } from '@prisma/client';

  export let artifact: Video;
</script>

<Meta
  title={artifact.title + ''}
  description="video by dave caruso released on {formatDate(artifact.date, 'date')}"
  video={artifact.media} />

<div class="meta">
  <h2>{artifact.title}</h2>
  <date>{formatDate(artifact.date, 'date')}</date>
</div>

<VideoPlayer src={artifact.media} />

<div class="tags">
  {#each [...artifact.tags] as tag}
    <tag>
      {tag}
    </tag>
  {/each}
</div>

<style lang="scss">
  h2 {
    font-size: 2.5rem;
  }
  date {
    display: block;
    font-size: 1rem;
  }
  .meta {
    margin-bottom: 1rem;
  }
  .tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  tag {
    margin: 0;
    border-radius: 0.5rem;
    background-color: #00442f;
    padding: 0.25rem 0.5rem;
    font-weight: 500;
    font-size: 0.75rem;
  }
</style>

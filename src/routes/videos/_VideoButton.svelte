<script lang="ts">
  import BlurHash from '$lib/components/BlurHash.svelte';
  import Button from '$lib/components/Button.svelte';
  import { VideoArtifact } from '$lib/structures';
  import { formatDate } from '$lib/utils/date';

  export let video: VideoArtifact;
</script>

<Button variant="subtle" href="/{video.id}">
  <figure>
    {#if video.blurhash && video.thumbnail}
      <BlurHash hash={video.blurhash} src={video.thumbnail} alt={video.title} />
    {:else if video.thumbnail}
      <img src={video.thumbnail} alt={video.title} />
    {/if}
  </figure>
  <div>
    <strong>{video.title}</strong>
    <date>{formatDate(video.date, 'date')}</date>
  </div>
</Button>

<style lang="scss">
  figure {
    max-width: 100%;
    aspect-ratio: 16/9;
    border: 2px solid #ade6dc;
    margin-bottom: 0.25rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  div {
    margin: 0;
    display: flex;
    flex-direction: column;
    margin-bottom: -0.1rem;
  }

  strong {
    font-weight: 500;
  }

  date {
    font-weight: 200;
  }
</style>

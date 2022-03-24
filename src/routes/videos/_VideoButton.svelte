<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Img from '$lib/components/Img.svelte';
  import { VideoArtifact } from '$lib/structures';
  import { formatDate } from '$lib/utils/date';

  export let video: VideoArtifact;
</script>

<main>
  <Button variant="subtle" href="/{video.id}">
    <thumbnail>
      {#if video.thumb}
        <Img src={video.thumb} alt={video.title} />
      {/if}
    </thumbnail>
    <video-details>
      <label>{video.title}</label>
      <date>{formatDate(video.date, 'date')}</date>
    </video-details>
  </Button>
</main>

<style lang="scss">
  main {
    width: 100%;
  }

  thumbnail {
    max-width: 100%;
    aspect-ratio: 16/9;
    border: 2px solid #ade6dc;
    margin-bottom: 0.25rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  video-details {
    margin: 0;
    display: flex;
    flex-direction: column;
    margin-bottom: -0.1rem;
  }

  label {
    font-weight: 500;
  }

  date {
    font-weight: 200;
  }
</style>

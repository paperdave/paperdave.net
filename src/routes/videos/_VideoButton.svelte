<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Img from '$lib/components/Img.svelte';
  import { formatDate } from '$lib/utils/date';
  import type { Video } from '@prisma/client';
  import type { VideoPartial } from '.';

  export let video: VideoPartial;
</script>

<article class="root">
  <Button variant="subtle" href="/videos/{video.id}" column aria-label={video.title}>
    <div class="thumb">
      {#if video.thumb}
        <Img src={video.thumb} alt={video.title} />
      {/if}
    </div>
    <div class="details">
      <div class="title">{video.title}</div>
      <time datetime={new Date(video.date).toISOString()}>{formatDate(video.date, 'date')}</time>
    </div>
  </Button>
</article>

<style lang="scss">
  .root {
    width: 100%;
  }

  .thumb {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.25rem;
    border: 2px solid #ade6dc;
    aspect-ratio: 16/9;
    max-width: 100%;
    overflow: hidden;
  }

  .details {
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-bottom: -0.1rem;
  }

  .title {
    font-weight: 500;
  }

  time {
    font-weight: 200;
  }
</style>

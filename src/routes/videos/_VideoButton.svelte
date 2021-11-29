<script lang="ts">
  import BlurHash from '$lib/components/BlurHash.svelte';
  import { VideoArtifact } from '$lib/structures';
  import { formatDate } from '$lib/utils/date';

  export let video: VideoArtifact;
</script>

<a href="/{video.id}">
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
</a>

<style lang="scss">
  a {
    max-width: 25rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    user-select: none;
    position: relative;

    &::after {
      content: '';
      display: block;
      background-color: rgba(255, 255, 255, 0);
      transition: background-color 0.2s ease-in-out;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(255, 255, 255, 0);
      border-radius: 0.3rem;
    }
    &:hover::after {
      background-color: rgba(255, 255, 255, 0.1);
    }
    &:focus {
      outline: none;
    }
    &:focus::after {
      border-color: rgba(255, 255, 255, 0.6);
      background-color: rgba(255, 255, 255, 0.1);
    }
    &:active::after {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

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

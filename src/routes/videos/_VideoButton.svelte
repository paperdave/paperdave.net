<script lang="ts">
  import { VideoArtifact } from '$lib/structures';

  export let video: VideoArtifact;
</script>

<a href="/{video.id}">
  <div class="thumb" style="--bg:url({video.thumbnail})" />
  <div class="info">
    <span>{video.title}</span>
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
    &:active::after {
      background-color: rgba(255, 255, 255, 0.2);
    }
    &:focus {
      outline: none;
    }
    &:focus::after {
      border-color: rgba(255, 255, 255, 0.6);
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .thumb {
    max-width: 100%;
    aspect-ratio: 16/9;
    border: 2px solid #ade6dc;
    background-image: var(--bg);
    background-size: cover;
  }

  .info {
    font-weight: medium;
    margin: 0.1rem 0;
    height: 3rem;
  }
</style>

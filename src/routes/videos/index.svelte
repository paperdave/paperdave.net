<script lang="ts" context="module">
  import { VideoArtifact } from '$lib/structures';
  import BackButton from '$lib/components/BackButton.svelte';
  import type { Load } from '@sveltejs/kit';
  import type { JSONData } from '$lib/structures';
  import VideoButton from './_VideoButton.svelte';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/videos/get-videos').then((res) => res.json());
    return {
      props: {
        videos: res.map((x: JSONData<VideoArtifact>) => VideoArtifact.fromJSON(x)),
      },
    };
  };
</script>

<script lang="ts">
  export let videos: VideoArtifact[];
</script>

<main>
  <BackButton position="corner" inverted />
  <div class="content">
    <h1>videos</h1>
  </div>
  <div class="videos">
    {#each videos as video}
      <div class="video-cell">
        <VideoButton {video} />
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  main {
    background-color: #005d40;
    color: white;
  }
  h1 {
    color: #22c6ad;
  }
  .content {
    padding-top: 2rem;
  }
  .videos {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    padding: 0 2rem;
  }
  .video-cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

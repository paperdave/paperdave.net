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
  import VideoHeader from './_VideoHeader.svelte';

  export let videos: VideoArtifact[];
</script>

<BackButton position="off-center" inverted />
<VideoHeader />
<grid>
  {#each videos as video}
    <article>
      <VideoButton {video} />
    </article>
  {/each}
</grid>
<p>welcome to the end of the video list</p>

<style lang="scss">
  grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    padding: 0 2rem;
  }
  article {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    margin: 2rem 0;
    text-align: center;
  }
</style>

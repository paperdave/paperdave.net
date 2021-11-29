<script lang="ts" context="module">
  import { VideoArtifact } from '$lib/structures';
  import BackButton from '$lib/components/BackButton.svelte';
  import type { Load } from '@sveltejs/kit';
  import VideoButton from './_VideoButton.svelte';

  export const load: Load = async ({ fetch }) => {
    const API = wrapAPI(fetch);
    return {
      props: {
        videos: await API.artifacts.getArtifactList('videos'),
      },
    };
  };
</script>

<script lang="ts">
  import VideoHeader from './_VideoHeader.svelte';
  import { wrapAPI } from '$lib/api-client/singleton';
  import Meta from '$lib/components/Meta.svelte';

  export let videos: VideoArtifact[];
</script>

<Meta title="videos" description="various animated videos all made with love." />

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

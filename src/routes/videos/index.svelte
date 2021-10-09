<script lang="ts" context="module">
  import { VideoArtifact } from '$lib/structures/VideoArtifact';

  import BackButton from '$lib/components/BackButton.svelte';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/videos/page-data.json').then((res) => res.json());
    return {
      props: {
        videos: res.map((x) => new VideoArtifact(x)),
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
    <p>you wish, lol. ill get to this soon!!!</p>
  </div>
  <div>
    <pre>
      <code>
        {JSON.stringify(videos, null, 2)}
      </code>
    </pre>
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
</style>

<script lang="ts" context="module">
  import BackButton from '$lib/components/BackButton.svelte';
  import VideoButton from './_VideoButton.svelte';
</script>

<script lang="ts">
  import VideoHeader from './_VideoHeader.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import type { Video } from '@prisma/client';
  import type { VideoPartial } from '.';

  export let videos: VideoPartial[];
</script>

<Meta title="videos" description="various animated videos all made with love." />

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
    grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
    margin: auto;
    padding: 0 2rem;
    max-width: 110rem;
    width: 100%;
  }
</style>

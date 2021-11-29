<script context="module" lang="ts">
  import { VideoArtifact } from '$lib/structures';
</script>

<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import VideoHeader from './_VideoHeader.svelte';
  import Layout from './__layout.svelte';
  import VideoPlayer from './_VideoPlayer.svelte';
  import { formatDate } from '$lib/utils/date';

  export let artifact: VideoArtifact;
</script>

<Meta
  title={artifact.title}
  description="Published {formatDate(artifact.date, 'date')}"
  image={artifact.thumbnail ?? null} />

<Layout>
  <BackButton inverted position="off-center" href="/videos" text="all videos" />

  <VideoHeader />
  <main>
    <div class="meta">
      <h2>{artifact.title}</h2>
      <date>{formatDate(artifact.date, 'date')}</date>
    </div>

    <VideoPlayer url={artifact.file} />

    <div class="tags">
      {#each [...artifact.tags] as tag}
        <tag>
          {tag}
        </tag>
      {/each}
    </div>
  </main>
</Layout>

<style lang="scss">
  main {
    margin: 2rem auto;
    width: 100%;
    max-width: 50rem;
  }
  h2 {
    font-size: 2.5rem;
    margin-bottom: -0.5rem;
  }
  date {
    display: block;
    font-size: 1rem;
  }
  .meta {
    margin-bottom: 1rem;
  }
  .tags {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }
  tag {
    padding: 0.25rem 0.5rem;
    margin: 0;
    border-radius: 0.5rem;
    background-color: #00442f;
    font-size: 0.75rem;
    font-weight: 500;
  }
</style>

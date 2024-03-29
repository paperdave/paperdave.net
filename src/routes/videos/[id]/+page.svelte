<script lang="ts">
  import BackButton from 'src/components/BackButton.svelte';
  import { formatDate } from 'src/date';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import VideoListItem from '../VideoListItem.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ThemeRoot background="#01422d" primary="#7fea27" foreground="#dcffd6">
  <layout-container size="large">
    <BackButton href="/videos">all videos</BackButton>
    <h1>{data.artifact?.title}</h1>
    <!-- svelte-ignore a11y-media-has-caption -->
    <figure class="full-width video-player">
      <video src={data.artifact?.media} controls autoplay />
    </figure>
    <p>Published on {formatDate(data.artifact?.date, 'date')}</p>
    {#if data.artifact?.tags?.length}
      <layout-flex row gap class="tags">
        {#each data.artifact?.tags ?? [] as tag}
          <a class="tag" href={`/videos?tags=${tag.replaceAll(' ', '-')}`}>{tag}</a>
        {/each}
      </layout-flex>
    {/if}
    <hr />
    <layout-flex class="other-vids" row>
      {#if data.next}
        <div>
          <h2>next:</h2>
          <VideoListItem video={data.next} />
        </div>
      {/if}
      {#if data.prev}
        <div>
          <h2>previous:</h2>
          <VideoListItem video={data.prev} />
        </div>
      {/if}
    </layout-flex>
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 4rem;
    font-weight: 800;
    margin: 0;
    @include shadow(#002116, 6);
  }
  .video-player {
    display: flex;
    border: 4px solid black;
    background-color: rgb(0, 0, 0, 0.5);
  }
  video {
    width: 100%;
    flex: 1;
    aspect-ratio: 16 / 9;
  }
  hr {
    margin: 1rem 0;
    border: 1px solid rgb(var(--pri));
  }
  .tag {
    display: inline-block;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: rgb(var(--pri));
    color: rgb(var(--on-pri));
    text-decoration: none;
  }
  .other-vids {
    margin: 0 -0.5rem;
    & > :global(*) {
      width: 20rem;
    }
  }
  h2 {
    margin: 0;
    margin-left: 0.5rem;
    font-weight: 500;
  }
  @media (max-width: 720px) {
    .other-vids {
      flex-direction: column;
      & > :global(*) {
        width: 100%;
      }
    }
  }
</style>

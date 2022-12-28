<script lang="ts">
  import { ThemeRoot } from '$lib';
  import BackButton from 'src/components/BackButton.svelte';
  import type { PageData } from './$types';
  import VideoListItem from './VideoListItem.svelte';

  export let data: PageData;
</script>

<ThemeRoot background="#01422d" primary="#7fea27" foreground="#dcffd6">
  <layout-container size="xl">
    <BackButton />
    <h1>paperdave videos</h1>
    <!-- <div>
      <strong>by tag:</strong>
      <div>
        {#each data.tags.sort() as tag}
          {@const count = data.artifacts.filter((a) => a.tags.includes(tag)).length}
          <span>{tag} ({count})</span>
        {/each}
      </div>
    </div> -->
    <layout-grid class="main-grid">
      {#each data.artifacts as video}
        <VideoListItem {video} />
      {/each}
    </layout-grid>
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 4rem;
    margin: 0;
  }
  .main-grid {
    grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
    grid-template-rows: repeat(auto-fill, auto);
    grid-gap: 0;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    & > * {
      height: 100%;
    }
  }
</style>

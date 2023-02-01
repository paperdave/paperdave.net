<script lang="ts">
  import type { Story } from '@prisma/client';
  import BackButton from 'src/components/BackButton.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: story = data.story;
</script>

<iframe src={story.url} title={story.title} frameborder="0" />

<div class="back-container">
  <BackButton href="/stories">all stories</BackButton>
</div>

<style lang="scss">
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
  .back-container {
    position: absolute;
    top: 10px;
    left: 0;
    z-index: 10;
    padding: 1rem;
  }
</style>

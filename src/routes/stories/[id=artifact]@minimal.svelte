<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';

  import { formatDate } from '$lib/utils/date';
  import type { Story } from '@prisma/client';

  export let story: Story;
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
    top: 0;
    left: 0;
    padding: 1rem;
    color: white;
  }
</style>

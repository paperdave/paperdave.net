<script context="module" lang="ts">
  export const load = createLoad({
    stories: types.ArrayOf(StoryArtifact),
  });
</script>

<script lang="ts">
  import { StoryArtifact } from '$lib/structures';
  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
  import { formatDate } from '$lib/utils/date';
  import { createLoad } from '$lib/utils/deserialize-load';
  import { types } from '@davecode/structures';

  export let stories: StoryArtifact[];
</script>

{#each stories as story}
  <article class="story">
    <flex row gap class="title">
      <h2>
        <a sveltekit:prefetch href={story.url}>{story.title}</a>
      </h2>
      <div>
        {#if story.endDate}
          released from
          <time datetime={story.date.toISOString()}>
            {formatDate(story.date, 'date')}
          </time>
          to
          <time datetime={story.endDate.toISOString()}>
            {formatDate(story.endDate, 'date')}
          </time>
        {:else}
          released on
          <time datetime={story.date.toISOString()}>
            {formatDate(story.date, 'date')}
          </time>
        {/if}
      </div>
    </flex>
    <p>
      {story.description}
    </p>
  </article>
{/each}

<style lang="scss">
  .story {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 3rem;
  }
  .title {
    align-items: baseline;
  }
</style>

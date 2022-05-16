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

<ThemeRoot background={palette.purple[100]} accent={palette.purple[300]}>
  <Paper marginTop>
    <Heading center shadow level="1">stories</Heading>
    <p class="center">
      the written word shares a huge meaning. in each story, i usually push the medium to a
      different extent, hopefully to create a uniquely meaningful experience.
    </p>
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
  </Paper>
</ThemeRoot>

<style lang="scss">
  .center {
    text-align: center;
  }
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

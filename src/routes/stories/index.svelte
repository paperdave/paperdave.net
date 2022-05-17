<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
  import { formatDate } from '$lib/utils/date';
  import type { Story } from '@prisma/client';

  export let stories: Story[];
</script>

{#each stories as story}
  <article class="story">
    <flex row gap class="title">
      <h2>
        <a sveltekit:prefetch href={story.url}>{story.title}</a>
      </h2>
      <div>
        {#if story.dateEnd}
          released from
          <time datetime={formatDate(story.date, 'iso')}>
            {formatDate(story.date, 'date')}
          </time>
          to
          <time datetime={formatDate(story.dateEnd, 'iso')}>
            {formatDate(story.dateEnd, 'date')}
          </time>
        {:else}
          released on
          <time datetime={formatDate(story.date, 'iso')}>
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

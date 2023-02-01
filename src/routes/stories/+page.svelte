<script lang="ts">
  import BackButton from 'src/components/BackButton.svelte';
  import { formatDate } from 'src/date';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: stories = data.stories;
</script>

<ThemeRoot background="#EDB9DD">
  <layout-container size="normal">
    <BackButton />
    <h1>stories</h1>
    <p>
      the written word shares a huge meaning. in each story, i usually push the medium to a
      different extent, hopefully to create a uniquely meaningful experience.
    </p>
    <p>
      these stories are all told in a different "universe", and not connected to the real world or
      any other piece of work of mine.
    </p>
    {#each stories as story}
      <article class="story">
        <flex row gap class="title">
          <h2>
            <a href="/stories/{story.id}">{story.title}</a>
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
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 4rem;
    text-align: center;
    color: #6d007a;
    @include shadow(#d255b2, 3);
  }
  a {
    color: inherit;
    text-decoration: underline;
  }
  h2,
  p {
    margin: 0;
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
  @media (max-width: 768px) {
    .title {
      flex-direction: column;
    }
  }
</style>

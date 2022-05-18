<script lang="ts" context="module">
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { formatDate } from '$lib/utils/date';
  import type { Load } from '@sveltejs/kit';
  import hardcoded from './amateur-extras.yaml';

  export const load: Load = async ({ fetch }) => {
    const API = wrapAPI(fetch);

    const actualArtifacts = await API.artifacts.getArtifactList('all');

    return {
      props: {
        actualArtifacts,
      },
    };
  };

  const typeDisplayName: Record<string, string> = {
    UNKNOWN: 'unknown',
    VIDEO: 'video',
    MUSIC: 'song',
    APP: 'app',
    JOURNAL: 'journal entry',
    FRAGMENT: 'fragment',
    WORD_MAGNET: 'word magnets',
    GAME: 'video game',
    NERD_GEAR: 'nerd gear',
    STORY: 'story',
    SQUARE: 'square',
    MUSIC_VIDEO: 'music video',
    DOODLE: 'doodle',
  };

  function getType(item: Artifact) {
    if (item.id === 'april-1st-2020') return '';

    if (item.tags.has('thursday')) return 'thursday ' + typeDisplayName[item.type];
    if (item.tags.has('how to')) return 'how to';
    if (item.type === 'VIDEO' && item.tags.has('visual cover')) return 'visual cover';

    return typeDisplayName[item.type] || 'thing';
  }

  function getTitle(item: Artifact) {
    if (item.id === 'april-1st-2020') return 'thursday video';

    let title = item.title.replace(/^music video:/, '');
    if (item.tags.has('thursday')) title = title.replace(/^thursday /, '');
    else if (item.tags.has('how to')) title = title.replace(/^how to /, '');

    if (item.tags.has('visual cover')) title = title.replace(/^visual cover: /, '');

    return title;
  }

  interface AmateurItem {
    id: string;
    date: Date;
    title: string;
    type?: string;
    link?: string;
  }
</script>

<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';

  export let actualArtifacts: Artifact[];

  const artifacts: (Artifact | AmateurItem)[] = [
    ...Object.keys(hardcoded).map((time, i) => ({
      ...hardcoded[time],
      id: 'hardcoded' + i,
      date: new Date(Date.parse(time) + 86400000),
    })),
    ...actualArtifacts,
  ].sort((a, b) => b.date.getTime() - a.date.getTime());
</script>

<Meta
  title="amateur mode"
  description={'in a distant universe, someone calls this page an "expert mode." however, this is probably the easiest and laziest way to use the website— dave just threw everything on one page. either way, have fun.'} />

<ThemeRoot background="#dedede" accent="#d71a25">
  <div class="container">
    <h1>amateur mode enabled!!!</h1>
    <p>
      in a distant universe, someone calls this page an "expert mode." however, this is probably the
      easiest and <em>laziest</em> way to use the website— dave just threw everything on one page. either
      way, have fun.
    </p>

    <a href="/">go back to "adventure" mode</a>

    <h2>all things by dave caruso</h2>

    <p>(dave is still adding everything to the database, so it will not be complete)</p>

    <!-- <div class="search">
      <input type="text" placeholder="search everything..." />
    </div> -->

    <ul>
      <!-- <li>
        <code class="year">????-</code>
        <code>??-??</code>
        {' '}
        <span>left universe</span>
      </li> -->

      {#each artifacts as item, i (item.id)}
        <li>
          <!-- TODO: change this so it reuses format results. Note: the formatDate is required due to time-zone issues. -->
          {#if i === 0 || formatDate(artifacts[i - 1].date, 'YYYY') !== formatDate(item.date, 'YYYY')}
            <span class="year">
              <span class="underlined">{formatDate(item.date, 'YYYY')}</span>-
            </span>
          {:else}
            <div class="year-implied" />
          {/if}

          <span class="month-day">{formatDate(item.date, 'MM-DD')}</span>

          &nbsp;

          <span>
            {#if item instanceof Artifact}
              <a href={`/${item.id}`}>
                <span class="type">{getType(item)}</span>{getType(item) ? ': ' : ''}{getTitle(item)}
              </a>
            {:else}
              {#if item.type}
                <span class="type">{item.type}</span>:
              {/if}{item.title}
            {/if}
          </span>
        </li>
      {/each}
    </ul>

    <p>again, the database isn't done and A LOT more exists.</p>
  </div>
</ThemeRoot>

<style lang="scss">
  .container {
    margin: auto;
    padding-top: 48px;
    padding-bottom: 48px;
    width: 750px;
  }

  h1,
  h2,
  p,
  ul {
    margin-bottom: 16px;
  }

  li {
    margin-bottom: 5px;
  }

  h1 {
    color: #d71a25;
    font-weight: bold;
    font-size: 3em;
    font-family: 'Roboto Slab';
    text-shadow: shadow(2px, 0.5, #520505);
  }
  h2 {
    margin-top: 50px;
    color: #000;
    font-weight: 400;
    font-size: 2em;
    font-family: 'Roboto Slab';
  }

  ul {
    position: relative;
  }

  .month-day,
  .year {
    --text-mono: 1;
    color: #555;
  }

  .year {
    position: absolute;
    right: 100%;
  }

  .underlined {
    position: absolute;
    right: 100%;
    z-index: 100;
    border-bottom: 0.2rem solid #aaa;
    background-color: #dedede;
  }

  .year-implied {
    position: absolute;
    right: calc(100% + 0.6rem);
    transform: translateY(-0.5rem);
    background: #aaa;
    width: 0.2rem;
    height: 1.5rem;
  }

  .search {
    margin-bottom: 16px;

    input {
      --text-mono: 1;
      border: 1px solid transparent;
      background: white;
      padding: 8px;
      width: 100%;
      color: black;
      &:focus {
        outline: none;
        border: 1px solid black;
      }
      &::placeholder {
        color: #666;
      }
    }
  }

  .type {
    font-weight: 600;
  }
</style>

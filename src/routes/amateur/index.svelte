<script lang="ts" context="module">
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import Heading from '$lib/components/Heading.svelte';

  //   const typeDisplayName: Record<string, string> = {
  //     UNKNOWN: 'unknown',
  //     VIDEO: 'video',
  //     MUSIC: 'song',
  //     APP: 'app',
  //     JOURNAL: 'journal entry',
  //     FRAGMENT: 'fragment',
  //     WORD_MAGNET: 'word magnets',
  //     GAME: 'video game',
  //     NERD_GEAR: 'nerd gear',
  //     STORY: 'story',
  //     SQUARE: 'square',
  //     MUSIC_VIDEO: 'music video',
  //     DOODLE: 'doodle',
  //   };

  //   function getType(item: Artifact) {
  //     if (item.id === 'april-1st-2020') return '';

  //     if (item.tags.has('thursday')) return 'thursday ' + typeDisplayName[item.type];
  //     if (item.tags.has('how to')) return 'how to';
  //     if (item.type === 'VIDEO' && item.tags.has('visual cover')) return 'visual cover';

  //     return typeDisplayName[item.type] || 'thing';
  //   }

  //   function getTitle(item: Artifact) {
  //     if (item.id === 'april-1st-2020') return 'thursday video';

  //     let title = item.title.replace(/^music video:/, '');
  //     if (item.tags.has('thursday')) title = title.replace(/^thursday /, '');
  //     else if (item.tags.has('how to')) title = title.replace(/^how to /, '');

  //     if (item.tags.has('visual cover')) title = title.replace(/^visual cover: /, '');

  //     return title;
  //   }

  //   interface AmateurItem {
  //     id: string;
  //     date: Date;
  //     title: string;
  //     type?: string;
  //     link?: string;
  //   }
  //
</script>

<script lang="ts">
  //   import Meta from '$lib/components/Meta.svelte';

  //   export let actualArtifacts: Artifact[];

  //   const artifacts: (Artifact | AmateurItem)[] = [
  //     ...Object.keys(hardcoded).map((time, i) => ({
  //       ...hardcoded[time],
  //       id: 'hardcoded' + i,
  //       date: new Date(Date.parse(time) + 86400000),
  //     })),
  //     ...actualArtifacts,
  //   ].sort((a, b) => b.date.getTime() - a.date.getTime());
</script>

<Meta
  title="amateur mode"
  description={'in a distant universe, someone calls this page an "expert mode." however, this is probably the easiest and laziest way to use the website— dave just threw everything on one page. either way, have fun.'} />

<ThemeRoot background="#dedede" accent="#d71a25">
  <Paper marginTop>
    <Heading level="1" shadow>amateur mode enabled!!!</Heading>
    <p>
      in a distant universe, someone calls this page an "expert mode." however, this is probably the
      easiest and <em>laziest</em> way to use the website— dave just threw everything on one page. either
      way, have fun.
    </p>

    <p>
      <a href="/">go back to "adventure" mode</a>
    </p>

    <!-- <h2>all things by dave caruso</h2> -->

    <!-- <div class="search">
      <input type="text" placeholder="search everything..." />
    </div> -->

    <p>(TODO: re-add everything to this page)</p>
  </Paper>
</ThemeRoot>

<style lang="scss">
</style>

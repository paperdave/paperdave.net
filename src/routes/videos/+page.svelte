<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { ThemeRoot } from '$lib';
  import BackButton from 'src/components/BackButton.svelte';
  import Button from 'src/lib/input-button/Button.svelte';
  import Checkbox from 'src/lib/input-checkbox/Checkbox.svelte';
  import { onDestroy } from 'svelte';
  import type { PageData } from './$types';
  import VideoListItem from './VideoListItem.svelte';

  export let data: PageData;

  const priorityTags = ['music video', 'visual cover'];
  const lowPriorityTags = ['ancient'];

  $: sortedTags = data.tags
    .map((name) => ({ name, count: data.artifacts.filter((a) => a.tags.includes(name)).length }))
    .sort((a, b) => b.count - a.count)
    .sort((a, b) => {
      const aPriority = priorityTags.includes(a.name) ? 1 : 0;
      const bPriority = priorityTags.includes(b.name) ? 1 : 0;
      return bPriority - aPriority;
    })
    .sort((a, b) => {
      const aPriority = lowPriorityTags.includes(a.name) ? 1 : 0;
      const bPriority = lowPriorityTags.includes(b.name) ? 1 : 0;
      return aPriority - bPriority;
    });

  let byTagMode = false;
  let tags: any = {};

  onDestroy(
    page.subscribe(($page) => {
      const tagString = $page.url.searchParams.get('tags');
      if (tagString) {
        byTagMode = true;
        tags = tagString
          .split(',')
          .reduce((acc, tag) => ({ ...acc, [tag.replaceAll('-', ' ')]: true }), {});
      }
    })
  );

  $: tagsEnabled = Object.entries(tags)
    .filter(([, v]) => v)
    .map((x) => x[0]);
  $: filtered = byTagMode
    ? data.artifacts.filter((x) => x.tags.some((tag) => tagsEnabled.includes(tag)))
    : data.artifacts;

  $: browser &&
    history.replaceState(
      {},
      '',
      `/videos${
        byTagMode ? `?tags=${tagsEnabled.map((x) => x.replaceAll(' ', '-')).join(',')}` : ''
      }`
    );
</script>

<ThemeRoot background="#01422d" primary="#7fea27" foreground="#dcffd6">
  <layout-container size="xl">
    <BackButton />
    <h1>paperdave videos</h1>
    <layout-button-row>
      <Button
        variant={byTagMode ? 'primary' : 'normal'}
        on:click={() => {
          byTagMode = !byTagMode;
          if (!byTagMode) tags = [];
        }}>by tag</Button
      >
      <Button
        on:click={() => {
          const random = data.artifacts[Math.floor(Math.random() * data.artifacts.length)];
          goto(`/videos/${random.id}`);
        }}>random</Button
      >
    </layout-button-row>
    {#if byTagMode}
      <div>
        {#each sortedTags as { name, count }}
          <div class="tag-item">
            <Checkbox bind:checked={tags[name]}>{name} ({count})</Checkbox>
          </div>
        {/each}
      </div>
    {/if}
    <layout-grid class="main-grid">
      {#each filtered as video}
        <VideoListItem {video} />
      {/each}
    </layout-grid>
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 4rem;
    font-weight: 800;
    margin: 0;
    @include shadow(#002116, 6);
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
  .tag-item {
    margin-bottom: 0.5rem;
  }
</style>

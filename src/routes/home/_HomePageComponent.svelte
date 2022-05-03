<script lang="ts">
  import { goto } from '$app/navigation';

  import Meta from '$lib/components/Meta.svelte';
  import { Artifact } from '$lib/structures';
  import HomePageAbout from './_HomePageAbout.svelte';
  import HomePageCategories from './_HomePageCategories.svelte';
  import HomePageExternals from './_HomePageExternals.svelte';
  import HomePageFresh from './_HomePageFresh.svelte';
  import HomePageHeader from './_HomePageHeader.svelte';

  let inputStack = new Array(20).fill('');
  function handleKeypress(event: KeyboardEvent) {
    const key = event.key;
    if (key.length !== 1) return;
    inputStack.push(key);
    inputStack.shift();
    const phrase = inputStack.join('');
    if (phrase.endsWith('login')) {
      goto('/auth');
    } else if (phrase.endsWith('rqa')) {
      goto('/q+a/respond');
    } else if (phrase.endsWith('afe')) {
      goto('/admin/artifact-editor');
    } else if (phrase.endsWith('admin')) {
      goto('/admin');
    } else if (phrase.endsWith('qa')) {
      goto('/q+a');
    } else if (phrase.endsWith('video')) {
      goto('/videos');
    } else if (phrase.endsWith('music')) {
      goto('/music');
    } else if (phrase.endsWith('tree')) {
      goto('/treehouse');
    }
  }

  export let freshList: Artifact[] = [];
</script>

<svelte:window on:keypress={handleKeypress} />

<Meta
  title="davecode: computer art to the limit"
  description="davecode is a creative project by dave caruso to take computer software and its artistic and automation capabilities to the limits." />

<flex>
  <flex row class="first-row">
    <HomePageHeader />
    <HomePageFresh list={freshList} />
  </flex>
  <flex row reverse class="second-row">
    <HomePageCategories />
    <HomePageAbout />
  </flex>
  <HomePageExternals />
</flex>

<style lang="scss">
  @media (max-width: 1860px) {
    .second-row {
      flex-direction: column;
    }
  }
  @media (max-width: 1600px) {
    .first-row {
      flex-direction: column;
    }
  }
</style>

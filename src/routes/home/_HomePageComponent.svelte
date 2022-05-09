<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import { Artifact } from '$lib/structures';
  import HomePageAbout from './_HomePageAbout.svelte';
  import HomePageCategories from './_HomePageCategories.svelte';
  import HomePageExternals from './_HomePageExternals.svelte';
  import HomePageFresh from './_HomePageFresh.svelte';
  import HomePageHeader from './_HomePageHeader.svelte';
  import HomePageKeyboardNav from './_HomePageKeyboardNav.svelte';

  export let freshList: Artifact[] = [];
</script>

<Meta
  title="davecode: computer art to the limit"
  description="davecode is a creative project by dave caruso to take computer software and its artistic and automation capabilities to the limits." />

<HomePageKeyboardNav />

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

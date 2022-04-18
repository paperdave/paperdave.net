<script context="module" lang="ts">
  import { wrapAPI } from '$lib/api-client/singleton';
  import { Artifact } from '$lib/structures';
  import type { Load } from '@sveltejs/kit';
  import HomePageComponent from './home/_HomePageComponent.svelte';

  export const load: Load = async ({ fetch }) => {
    const API = wrapAPI(fetch);

    return {
      props: {
        freshList: await API.artifacts.getArtifactList('new'),
      },
    };
  };
</script>

<script lang="ts">
  export let freshList: Artifact[];
</script>

<HomePageComponent {freshList} />

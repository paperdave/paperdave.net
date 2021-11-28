<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = restrictedPage([]);
</script>

<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
  import { restrictedPage } from '$lib/utils/client';
</script>

<main>
  <BackButton position="corner" />
  <h1>admin</h1>

  <a href="/admin/artifact-explorer">Artifact Explorer</a>
</main>

<style lang="scss">
  main {
    padding: 2rem;
  }
  h1 {
    margin-top: 2rem;
  }
</style>

<script context="module" lang="ts">
  import { Artifact, enhanceArtifact } from '$lib/structures';

  import type { Load } from '@sveltejs/kit';
  import { SvelteComponentDev, SvelteComponentTyped } from 'svelte/internal';

  export const load: Load = async ({ fetch, page }) => {
    const artifactId = page.path.slice(1);
    if (artifactId.match(/^[a-z0-9_-]+$/)) {
      const artifact = await fetch(`/get-artifact?id=${artifactId}`).then((res) => res.json());
      if (artifact && !artifact.error) {
        return {
          props: {
            artifact: enhanceArtifact(artifact),
          },
        };
      }
    }

    const json = await fetch(`/get-redirect?page=${encodeURIComponent(page.path)}`) //
      .then((res) => res.json());
    if (json.redirect) {
      return { redirect: json.redirect, status: 301 };
    }
    return {
      status: 404,
    };
  };

  declare class ViewerClass extends SvelteComponentTyped<{ artifact: any }> {}
</script>

<script lang="ts">
  import MusicArtifactViewer from './music/_MusicArtifactViewer.svelte';

  export let artifact: Artifact;

  const viewers: Record<string, typeof ViewerClass> = {
    music: MusicArtifactViewer,
  };

  $: viewer = viewers[artifact.type];
</script>

{#if viewer}
  <svelte:component this={viewer} {artifact} />
{:else}
  <p>No viewer component exists for artifact type "{artifact.type}".</p>
{/if}

<style lang="scss">
</style>

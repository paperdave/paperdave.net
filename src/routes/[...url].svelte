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
  import ErrorPage from '$lib/components/ErrorPage.svelte';
  import MusicArtifactViewer from './music/_MusicArtifactViewer.svelte';
  import VideoArtifactViewer from './videos/_VideoArtifactViewer.svelte';

  export let artifact: Artifact;

  const viewers: Record<string, typeof ViewerClass> = {
    music: MusicArtifactViewer,
    video: VideoArtifactViewer,
  };

  $: viewer = viewers[artifact.type];
</script>

{#if viewer}
  <svelte:component this={viewer} {artifact} />
{:else}
  <ErrorPage>
    <h1>not implemented</h1>
    <p>
      there is no viewer for artifact type <em>{artifact.type}</em> yet.
    </p>
    <p>below is the serialized data for it, so you can see what it looks like.</p>
    <pre>{JSON.stringify(artifact, null, 2)}</pre>
    <p>check back later, and maybe you'll be able to properly view it.</p>
  </ErrorPage>
{/if}

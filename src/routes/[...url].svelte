<script context="module" lang="ts">
  import type { Artifact } from '$lib/structures';

  import type { Load } from '@sveltejs/kit';
  import { SvelteComponentTyped } from 'svelte/internal';
  import { wrapAPI } from '$lib/api-client/singleton';

  const artifactTypes: Record<string, string> = {
    VIDEO: 'videos',
    MUSIC: 'music',
    APP: 'apps',
    JOURNAL: 'journal',
    FRAGMENT: 'fragments',
    WORD_MAGNET: '?????',
    GAME: 'games',
    NERD_GEAR: 'nerd-gear',
    STORY: 'stories',
    SQUARE: '?????',
    MUSIC_VIDEO: 'music-videos',
  };

  export const load: Load = async ({ url, fetch }) => {
    const API = wrapAPI(fetch);

    // Artifact direct links
    // TODO: rewrite this as a function because holy hell this indentation is ugly
    const splits = url.pathname.split('/');
    if (splits.length === 3) {
      const type = splits[1];
      const id = splits[2];

      if (Object.values(artifactTypes).includes(type)) {
        const artifact = await API.artifacts.getArtifact(id);

        if (artifact) {
          // the only case this /type/id format is allowed is for viewing song pages for music videos

          if (type === 'music' && artifact) {
            return {
              props: {
                artifact,
                viewer: 'MUSIC',
              },
            };
          }

          return {
            status: 301,
            headers: {
              Location: `/${artifact.id}`,
            },
          };
        }
      }
    }
    if (splits.length === 2) {
      const id = splits[1];

      const artifact = await API.artifacts.getArtifact(id);

      if (artifact) {
        return {
          props: {
            artifact,
          },
        };
      }
    }

    // Redirects
    const json = await fetch(`/get-redirect?page=${encodeURIComponent(url.pathname)}`) //
      .then((res) => res.json());

    if (json.redirect) {
      return { redirect: json.redirect, status: 301 };
    }

    // 404
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
  import IFrameViewer from '$lib/components/IFrameViewer.svelte';

  export let artifact: Artifact;
  export let viewer: string | null = null;

  const viewers: Record<string, typeof ViewerClass> = {
    MUSIC: MusicArtifactViewer,
    VIDEO: VideoArtifactViewer,
    MUSIC_VIDEO: VideoArtifactViewer,
    // STORY: IFrameViewer,
  };

  $: comp = viewers[viewer ?? artifact.type];
</script>

{#if comp}
  <svelte:component this={comp} {artifact} />
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

<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { Artifact, ArtifactVisibility, Permission, User } from '$lib/structures';
  import ArtifactEditor from './_ArtifactEditor.svelte';
  import { page } from '$app/stores';
  import { Button } from 'fluent-svelte';
  import deepEqual from 'fast-deep-equal';
  import ArtifactPreview from '../../[...url].svelte';
  import { API, wrapAPI } from '$lib/api-client/singleton';

  export const load: Load = restrictedPage([Permission.EDIT_ARTIFACTS], async ({ fetch, page }) => {
    const API = wrapAPI(fetch);

    // creating a new artifact
    if (page.params.id === 'new') {
      const artifact = new Artifact()
        .setId('new-artifact-' + Date.now())
        .setType('unknown')
        .setVisibility(ArtifactVisibility.DRAFT);

      await API.artifacts.createArtifact(artifact);

      sidebarAddArtifact(artifact);

      return {
        status: 302,
        redirect: '/admin/artifact-explorer/' + artifact.id,
      };
    }

    // editing an existing artifact
    return {
      props: {
        artifactID: page.params.id,
      },
    };
  });
</script>

<script lang="ts">
  import { ContentDialog } from 'fluent-svelte';
  import { goto } from '$app/navigation';
  import {
    sidebarAddArtifact,
    sidebarDeleteArtifact,
    sidebarModifyArtifact,
  } from './_Sidebar.svelte';
  import { browser } from '$app/env';
  import highlightjs from 'highlight.js';
  import { user } from '$lib/api-client/session';
  import { restrictedPage } from '$lib/utils/client';
  import ArtifactEditorPage from './_ArtifactEditorPage.svelte';

  $: canEdit = $user?.queryPermission(Permission.EDIT_ARTIFACTS);

  export let artifactID: string;

  $: artifactPromise = browser ? API.artifacts.getArtifact(artifactID) : Promise.resolve(null);
</script>

{#if browser}
  {#await artifactPromise}
    <ArtifactEditorPage artifact={null} skeleton />
  {:then artifact}
    <ArtifactEditorPage {artifact} />
  {/await}
{/if}

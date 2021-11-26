<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { Artifact, ArtifactVisibility } from '$lib/structures';
  import ArtifactEditor from './_ArtifactEditor.svelte';
  import { page } from '$app/stores';
  import { Button } from 'fluent-svelte';
  import deepEqual from 'fast-deep-equal';
  import ArtifactPreview from '../../[...url].svelte';

  export const load: Load = async ({ fetch, page }) => {
    if (page.params.id === 'new') {
      const response = await fetch('/admin/artifact-explorer/create-artifact') //
        .then((r) => r.json());

      sidebarAddArtifact(
        new Artifact() //
          .setId(response.id)
          .setType('unknown')
          .setVisibility(ArtifactVisibility.DRAFT)
      );

      return {
        status: 302,
        redirect: '/admin/artifact-explorer/' + response.id,
      };
    }
    const data = await fetch(`/admin/artifact-explorer/get-artifact?id=${page.params.id}`) //
      .then((res) => res.json());

    if (data.error) {
      return {
        props: {
          artifact: null,
        },
      };
    }

    return {
      props: {
        artifact: data && Artifact.fromJSON(data),
      },
    };
  };
</script>

<script lang="ts">
  import { ContentDialog } from 'fluent-svelte';
  import { goto } from '$app/navigation';
  import {
    sidebarAddArtifact,
    sidebarDeleteArtifact,
    sidebarModifyArtifact,
  } from './_Sidebar.svelte';

  export let artifact: Artifact | null = null;

  $: edited = artifact && Artifact.fromJSON(artifact.toJSON());

  function handleChange(event: CustomEvent) {
    edited = event.detail;
  }

  function reset() {
    if (artifact) {
      edited = Artifact.fromJSON(artifact.toJSON());
    }
  }

  $: equal = !!(artifact && deepEqual(edited && edited.toJSON(), artifact.toJSON()));

  let deleteDialogOpen = false;

  async function deleteArtrifact() {
    if (artifact) {
      sidebarDeleteArtifact(artifact.id);
      await fetch('/admin/artifact-explorer/delete-artifact', {
        method: 'POST',
        body: JSON.stringify({ id: artifact.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((r) => r.json());

      goto('/admin/artifact-explorer');
    }
  }

  async function saveArtifact() {
    if (artifact && edited) {
      sidebarModifyArtifact(artifact.id, edited);
      await fetch('/admin/artifact-explorer/save-artifact', {
        method: 'POST',
        body: JSON.stringify({ id: artifact.id, artifact: edited.toJSON() }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((r) => r.json());
      history.replaceState(null, document.title, '/admin/artifact-explorer/' + edited.id);
      artifact = edited;
    }
  }

  function guessUrls() {
    if (!edited) return;

    const year = edited.date.getFullYear();

    if (edited.type === 'video') {
      edited.thumbnail = `https://media.davecode.net/content/${year}/${edited.id}.png`;
      edited.data.set('file', `https://media.davecode.net/content/${year}/${edited.id}.mp4`);
    }
  }
</script>

<main>
  {#if artifact !== null && edited !== null}
    <div class="editor">
      <header>
        <Button variant="accent" on:click={saveArtifact} disabled={equal}>Save</Button>
        <Button on:click={reset} disabled={equal}>Reset</Button>
        <Button on:click={() => (deleteDialogOpen = true)}>Delete</Button>
        <Button on:click={guessUrls}>Guess URLs</Button>
      </header>
      {#key $page.path}
        <ArtifactEditor rawArtifact={edited} on:change={handleChange} />
      {/key}
    </div>
    <div class="json">
      <pre>{JSON.stringify(edited.toJSON(), null, 2)}</pre>
    </div>
    <div class="page-preview">
      <ArtifactPreview artifact={edited} />
    </div>
    <ContentDialog bind:open={deleteDialogOpen} title={`Delete "${artifact.id}"?`}>
      <div style="display: flex; flex-direction: column; gap: 12px; margin: 0;">
        Once you delete an artifact, it cannot be recovered.
      </div>
      <svelte:fragment slot="footer">
        <Button
          variant="accent"
          on:click={() => {
            deleteDialogOpen = false;
            deleteArtrifact();
          }}>Delete</Button>
        <Button
          on:click={() => {
            deleteDialogOpen = false;
          }}>Cancel</Button>
      </svelte:fragment>
    </ContentDialog>
  {:else}
    <div class="empty">
      <p>
        Cannot find artifact with id: <code>{$page.params.id}</code>
      </p>
    </div>
  {/if}
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'editor json'
      'editor page-preview';
  }
  header {
    padding: 1rem;
    padding-bottom: 0;
  }
  .editor {
    grid-area: editor;
  }
  .json {
    grid-area: json;
    font-family: Hack, monospace;
    background-color: #000;
    padding: 1rem;
    overflow-y: scroll;
    overflow-x: auto;
  }
  .page-preview {
    grid-area: page-preview;
    background-color: white;
    color: black;
  }
</style>

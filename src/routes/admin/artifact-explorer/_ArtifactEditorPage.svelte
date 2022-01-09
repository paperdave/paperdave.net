<script lang="ts" context="module">
  import { Artifact, Permission } from '$lib/structures';
  import ArtifactEditor from './_ArtifactEditor.svelte';
  import { page } from '$app/stores';
  import { Button } from 'fluent-svelte';
  import deepEqual from 'fast-deep-equal';
  import ArtifactPreview from '../../[...url].svelte';
  import { API } from '$lib/api-client/singleton';
</script>

<script lang="ts">
  import { ContentDialog } from 'fluent-svelte';
  import { goto } from '$app/navigation';
  import { sidebarDeleteArtifact, sidebarModifyArtifact } from './_Sidebar.svelte';
  import { browser } from '$app/env';
  import highlightjs from 'highlight.js';
  import { user } from '$lib/api-client/session';

  $: canEdit = $user?.queryPermission(Permission.EDIT_ARTIFACTS);

  export let artifact: Artifact | null = null;
  export let skeleton: boolean = false;

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
      await API.artifacts.deleteArtifact(artifact.id);

      goto('/admin/artifact-explorer');
    }
  }

  async function saveArtifact() {
    if (artifact && edited) {
      sidebarModifyArtifact(artifact.id, edited);
      await API.artifacts.updateArtifact(artifact.id, edited);
      history.replaceState(null, document.title, '/admin/artifact-explorer/' + edited.id);
      artifact = edited;
    }
  }

  async function guessUrls() {
    if (!edited) return;

    const year = edited.date.getFullYear();

    if (edited.type === 'video') {
      let imageUrl: string | null = null;
      const imagePotentialLocations = [
        `https://media.davecode.net/content/${year}/${edited.id}.png`,
        `https://media.davecode.net/content/${year}/${edited.id}.jpeg`,
        `https://media.davecode.net/content/${year}/${edited.id}.jpg`,
      ];

      for (const potentialLocation of imagePotentialLocations) {
        try {
          const response = await fetch(potentialLocation, {
            method: 'HEAD',
          });
          if (response.ok) {
            imageUrl = potentialLocation;
            break;
          }
        } catch (e) {
          //
        }
      }

      edited.thumbnail = imageUrl ?? '[failed]';
      edited.data.set('file', `https://media.davecode.net/content/${year}/${edited.id}.mp4`);
    }
  }
</script>

{#if browser}
  <main>
    {#if skeleton}
      <div class="editor">
        <header>
          <Button variant="accent" on:click={saveArtifact} disabled={equal || !canEdit}
            >Save</Button>
          <Button on:click={reset} disabled={equal || !canEdit}>Reset</Button>
          <Button disabled={!canEdit} on:click={() => (deleteDialogOpen = true)}>Delete</Button>
          <Button disabled={!canEdit} on:click={guessUrls}>Guess URLs</Button>
        </header>
        {#key $page.path}
          <ArtifactEditor
            rawArtifact={new Artifact().setId('\0')}
            skeleton
            on:change={handleChange} />
        {/key}
      </div>
    {:else if artifact !== null && edited !== null}
      <div class="editor">
        <header>
          <Button variant="accent" on:click={saveArtifact} disabled={equal || !canEdit}
            >Save</Button>
          <Button on:click={reset} disabled={equal || !canEdit}>Reset</Button>
          <Button disabled={!canEdit} on:click={() => (deleteDialogOpen = true)}>Delete</Button>
          <Button disabled={!canEdit} on:click={guessUrls}>Guess URLs</Button>
        </header>
        {#key $page.path}
          <ArtifactEditor rawArtifact={edited} on:change={handleChange} />
        {/key}
      </div>
      <div class="json">
        <pre>
        {@html highlightjs.highlight(JSON.stringify(edited.toJSON(), null, 2), {
          language: 'json'
        }).value}
      </pre>
      </div>
      <div class="page-preview">
        <ArtifactPreview artifact={edited} />
      </div>
      <ContentDialog bind:open={deleteDialogOpen} title={`Delete "${artifact.id}"?`}>
        <div>Once you delete an artifact, it cannot be recovered.</div>
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
{/if}

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: 1fr 50rem;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'editor json'
      'editor page-preview';

    height: 100%;
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
    background-color: #050505;
    color: #f7f7f7;
    font-size: 0.7rem;
    padding: 1rem;
    overflow-y: auto;
    overflow-x: auto;
  }
  .page-preview {
    grid-area: page-preview;
    background-color: white;
    color: black;
    display: grid;
    overflow-y: auto;
    overflow-x: auto;
  }
  .json :global {
    .hljs-attr {
      color: #f37274;
    }
    .hljs-string {
      color: #76d982;
    }
    .hljs-number {
      color: #f77d0a;
    }
  }
</style>

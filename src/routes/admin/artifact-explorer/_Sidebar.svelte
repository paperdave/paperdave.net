<script context="module" lang="ts">
  let artifactsLoaded = false;
  let artifactPromise: Promise<typeof artifacts> | null = null;

  const artifacts = writable<Artifact[]>([]);

  async function getArtifactListing() {
    if (!browser) {
      return [];
    }
    if (artifactsLoaded) {
      return artifacts;
    } else if (artifactPromise) {
      return artifactPromise;
    } else {
      const [p, resolve] = deferred<typeof artifacts>();
      artifactPromise = p;
      const artifactListing: Artifact[] = browser
        ? await fetch('/admin/artifact-explorer/get-all-artifacts')
            .then((res) => res.json())
            .then((json) => {
              if (json.error) {
                return Promise.reject(new Error(json.error));
              } else {
                return json.map((artifact: JSONData<Artifact>) => Artifact.fromJSON(artifact));
              }
            })
        : [];
      artifacts.set(artifactListing);
      resolve(artifacts);
      artifactsLoaded = true;
    }
  }

  export async function sidebarDeleteArtifact(id: string) {
    artifacts.update((artifacts) => {
      return artifacts.filter((artifact) => artifact.id !== id);
    });
  }

  export async function sidebarModifyArtifact(id: string, newArtifact: Artifact) {
    artifacts.update((artifacts) => {
      return artifacts.map((artifact) => {
        if (artifact.id === id) {
          return newArtifact;
        } else {
          return artifact;
        }
      });
    });
  }

  export async function sidebarAddArtifact(newArtifact: Artifact) {
    artifacts.update((artifacts) => {
      return [...artifacts, newArtifact];
    });
  }
</script>

<script lang="ts">
  import ArtifactListItem from './_ArtifactListItem.svelte';
  import { Button, IconButton, ProgressRing } from 'fluent-svelte';
  import { browser } from '$app/env';
  import type { JSONData } from '$lib/structures';
  import { Permission } from '$lib/structures';
  import { Artifact } from '$lib/structures';
  import { writable } from 'svelte/store';
  import { deferred } from '$lib/utils/promise';
  import { persist, localStorage as local } from '@macfja/svelte-persistent-store';
  import { webSession } from '$lib/utils/client';
  import AddSVG from '$lib/svg/Add.svg?component';

  $: canCreate = $webSession.user?.hasPermission(Permission.CREATE_ARTIFACTS);

  const sortMethods: Record<string, (a: Artifact, b: Artifact) => number> = {
    ID: (a, b) => (a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1),
    Title: (a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1),
    Date: (a, b) => (a.date < b.date ? 1 : -1),
    Type: (a, b) => (a.type > b.type ? 1 : -1),
  };

  let sortMethod = persist(writable('ID'), local(true), 'ArtifactExplorer.Sidebar.sortMethod');
  let inverted = persist(writable(false), local(true), 'ArtifactExplorer.Sidebar.inverted');

  $: sort = (a: Artifact[]) => {
    const sorted = a.sort(sortMethods[$sortMethod] || sortMethods.ID);
    if ($inverted) {
      return sorted.reverse();
    } else {
      return sorted;
    }
  };
</script>

{#await getArtifactListing()}
  <div class="loading-container">
    <ProgressRing />
  </div>
{:then}
  <div class="artifact-list">
    <div class="sort-methods">
      <IconButton href="/admin/artifact-explorer/new" disabled={!canCreate}>
        <AddSVG />
      </IconButton>
      {#each Object.keys(sortMethods) as method}
        <Button
          class="sort-method"
          on:click={() => {
            if ($sortMethod === method) {
              $inverted = !$inverted;
            } else {
              $sortMethod = method;
              $inverted = false;
            }
          }}
          variant={$sortMethod === method ? 'accent' : 'standard'}>
          {method}
        </Button>
      {/each}
    </div>

    <div class="list">
      {#each sort($artifacts) as artifact}
        <ArtifactListItem {artifact} />
      {/each}
    </div>
  </div>
{:catch error}
  Error: {error.error}
{/await}

<style lang="scss">
  .artifact-list {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .list {
    flex: 1;
    overflow-y: scroll;
  }
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
  }
  .sort-methods {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    gap: 0.5rem;
  }
</style>

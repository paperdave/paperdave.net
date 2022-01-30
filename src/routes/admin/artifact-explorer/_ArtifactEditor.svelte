<script lang="ts">
  import { Artifact, artifactTypeMap, enhanceArtifact } from '$lib/structures';
  import { ComboBox } from 'fluent-svelte';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { capitalCase } from 'change-case';
  import EditorField from './util/_EditorField.svelte';
  import { useEffect } from '$lib/hooks/useEffect';
  import { SvelteComponentDev } from 'svelte/internal';

  import * as CommonPropertiesEditor from './editors/_CommonPropertiesEditor.svelte';
  import * as AppArtifactEditor from './editors/_AppArtifactEditor.svelte';
  import * as FileArtifactEditor from './editors/_FileArtifactEditor.svelte';
  import * as FragmentArtifactEditor from './editors/_FragmentArtifactEditor.svelte';
  import * as GameArtifactEditor from './editors/_GameArtifactEditor.svelte';
  import * as GraveyardArtifactEditor from './editors/_GraveyardArtifactEditor.svelte';
  import * as JournalArtifactEditor from './editors/_JournalArtifactEditor.svelte';
  import * as MusicArtifactEditor from './editors/_MusicArtifactEditor.svelte';
  import * as NerdGearArtifactEditor from './editors/_NerdGearArtifactEditor.svelte';
  import * as SoftwareArtifactEditor from './editors/_SoftwareArtifactEditor.svelte';
  import * as SquareArtifactEditor from './editors/_SquareArtifactEditor.svelte';
  import * as StoryArtifactEditor from './editors/_StoryArtifactEditor.svelte';
  import * as VideoArtifactEditor from './editors/_VideoArtifactEditor.svelte';

  interface MiniEditorDefinition {
    applies(artifact: Artifact): boolean;
    default: SvelteComponentDev;
  }

  const editors = [
    CommonPropertiesEditor,
    AppArtifactEditor,
    FileArtifactEditor,
    FragmentArtifactEditor,
    GameArtifactEditor,
    GraveyardArtifactEditor,
    JournalArtifactEditor,
    MusicArtifactEditor,
    NerdGearArtifactEditor,
    SoftwareArtifactEditor,
    SquareArtifactEditor,
    StoryArtifactEditor,
    VideoArtifactEditor,
  ] as unknown[] as MiniEditorDefinition[];

  const emit = createEventDispatcher();

  export let rawArtifact: Artifact;
  export let skeleton: boolean = false;

  $: artifactStore = writable(enhanceArtifact(rawArtifact));

  useEffect(
    () => {
      return artifactStore.subscribe((value) => {
        emit('change', value);
      });
    },
    () => [artifactStore]
  );
</script>

<main>
  <EditorField label="Type">
    <ComboBox
      disabled={skeleton}
      items={Object.keys(artifactTypeMap).map((x) => ({
        name: x,
        value: x,
      }))}
      value={skeleton ? '...' : $artifactStore.type}
      on:select={(ev) => (rawArtifact.type = ev.detail.value)} />
  </EditorField>
  {#each editors as editor}
    {#if editor.applies($artifactStore)}
      <svelte:component this={editor.default} bind:artifact={artifactStore} />
    {/if}
  {/each}
</main>

<style lang="scss">
  main {
    padding: 1rem;
  }
</style>

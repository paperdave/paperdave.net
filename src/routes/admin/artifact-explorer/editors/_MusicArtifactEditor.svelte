<script context="module" lang="ts">
  import { FileArtifact, ArtifactVisibility, Artifact, MusicArtifact } from '$lib/structures';
  import { TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof MusicArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<MusicArtifact>;
</script>

<EditorField label="Sheet Music URL">
  <TextBox bind:value={$artifact.sheetmusicImage} />
</EditorField>

<style lang="scss">
</style>

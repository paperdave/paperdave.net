<script context="module" lang="ts">
  import { FileArtifact, Artifact } from '$lib/structures';
  import { TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof FileArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<FileArtifact>;
</script>

<EditorField label="File URL">
  <TextBox bind:value={$artifact.file} />
</EditorField>

<style lang="scss">
</style>

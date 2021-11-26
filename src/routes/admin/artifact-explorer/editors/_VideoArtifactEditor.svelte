<script context="module" lang="ts">
  import { Artifact, MusicArtifact, VideoArtifact } from '$lib/structures';
  import { NumberBox, TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof VideoArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<VideoArtifact>;
</script>

<EditorField label="TTMS">
  <NumberBox bind:value={$artifact.ttms} />
</EditorField>

<style lang="scss">
</style>

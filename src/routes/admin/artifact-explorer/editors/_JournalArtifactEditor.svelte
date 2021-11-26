<script context="module" lang="ts">
  import { Artifact, JournalArtifact } from '$lib/structures';
  import { TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof JournalArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<JournalArtifact>;
</script>

<p>[JournalArtifact do not have any extra properties]</p>

<style lang="scss">
</style>

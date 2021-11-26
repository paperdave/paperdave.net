<script context="module" lang="ts">
  import { Artifact, SoftwareArtifact } from '$lib/structures';
  import { TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof SoftwareArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<SoftwareArtifact>;
</script>

<p>[SoftwareArtifact do not have any extra properties]</p>

<style lang="scss">
</style>

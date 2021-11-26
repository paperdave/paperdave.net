<script context="module" lang="ts">
  import { Artifact, NerdGearArtifact } from '$lib/structures';
  import { TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof NerdGearArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<NerdGearArtifact>;
</script>

<p>[NerdGearArtifact do not have any extra properties]</p>

<style lang="scss">
</style>

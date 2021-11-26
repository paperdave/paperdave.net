<script context="module" lang="ts">
  import { Artifact, SquareArtifact } from '$lib/structures';
  import { TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof SquareArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<SquareArtifact>;
</script>

<p>[SquareArtifact do not have any extra properties]</p>

<style lang="scss">
</style>

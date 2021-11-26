<script context="module" lang="ts">
  import { Artifact, GameArtifact } from '$lib/structures';
  import { TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof GameArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<GameArtifact>;
</script>

<p>[GameArtifact do not have any extra properties]</p>

<style lang="scss">
</style>

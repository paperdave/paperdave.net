<script context="module" lang="ts">
  import { Artifact, FragmentArtifact, GraveyardArtifact } from '$lib/structures';
  import { TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof GraveyardArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<GraveyardArtifact>;
</script>

<p>[GraveyardArtifact do not have any extra properties]</p>

<style lang="scss">
</style>

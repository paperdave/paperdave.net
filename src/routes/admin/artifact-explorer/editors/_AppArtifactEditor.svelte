<script context="module" lang="ts">
  import { AppArtifact, Artifact } from '$lib/structures';
  import { TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof AppArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<AppArtifact>;
</script>

<p>[AppArtifact do not have any extra properties]</p>

<style lang="scss">
</style>

<script context="module" lang="ts">
  import { Artifact, StoryArtifact } from '$lib/structures';
  import { TextBox } from 'fluent-svelte';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return artifact instanceof StoryArtifact;
  }
</script>

<script lang="ts">
  export let artifact: SvelteStore<StoryArtifact>;
</script>

<p>[StoryArtifact do not have any extra properties]</p>

<style lang="scss">
</style>

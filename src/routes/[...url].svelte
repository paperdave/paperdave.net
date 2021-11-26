<script context="module" lang="ts">
  import { Artifact, enhanceArtifact } from '$lib/structures';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, page }) => {
    const artifactId = page.path.slice(1);
    if (artifactId.match(/^[a-z0-9_-]+$/)) {
      const artifact = await fetch(`/get-artifact?id=${artifactId}`).then((res) => res.json());
      if (artifact && !artifact.error) {
        return {
          props: {
            artifact: enhanceArtifact(artifact),
          },
        };
      }
    }

    const json = await fetch(`/get-redirect?page=${encodeURIComponent(page.path)}`) //
      .then((res) => res.json());
    if (json.redirect) {
      return { redirect: json.redirect, status: 301 };
    }
    return {
      status: 404,
    };
  };
</script>

<script lang="ts">
  export let artifact: Artifact;
</script>

<main>
  {JSON.stringify(artifact.toJSON(), null, 2)}
  <br />
  {artifact.constructor.name}
</main>

<style lang="scss">
</style>

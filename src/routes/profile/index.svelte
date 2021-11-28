<script context="module" lang="ts">
  export const load = restrictedPage([]);
</script>

<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
  import { restrictedPage, webSession } from '$lib/utils/client';
</script>

<main>
  <BackButton position="corner" />
  <h1>your profile</h1>
  <button>logout (not supported yet)</button>
  <pre>
    <code>
      {JSON.stringify($webSession.toJSON(), null, 2)}
    </code>
  </pre>
</main>

<style lang="scss">
  main {
    padding: 2rem;
  }
  h1 {
    margin-top: 2rem;
  }
</style>

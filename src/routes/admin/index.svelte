<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ session, page }) => {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/auth?r=' + encodeURIComponent(page.path),
      };
    }

    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
</script>

<main>
  <BackButton position="corner" />
  <h1>admin</h1>
</main>

<style lang="scss">
  main {
    padding: 2rem;
  }
  h1 {
    margin-top: 2rem;
  }
</style>

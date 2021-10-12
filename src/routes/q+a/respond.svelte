<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ session, page }) => {
    if (!session.token) {
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
  import QaHeader from './_QAHeader.svelte';
</script>

<main>
  <QaHeader />
</main>

<style lang="scss">
</style>

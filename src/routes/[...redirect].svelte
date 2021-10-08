<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, page }) => {
    const r = await fetch(`/get-redirect?url=${page.path}`).then((x) => x.json());
    if (r.redirect) {
      return { redirect: r.redirect, status: 301 };
    }
    return {
      status: 404,
    };
  };
</script>

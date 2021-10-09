<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, page }) => {
    const r = await fetch(`/get-redirect?page=${encodeURIComponent(page.path)}`);
    const json = await r.json();
    if (json.redirect) {
      return { redirect: json.redirect, status: 301 };
    }
    return {
      status: 404,
    };
  };
</script>

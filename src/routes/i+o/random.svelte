<script context="module" lang="ts">
  import Meta from '$lib/components/Meta.svelte';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const API = wrapAPI(fetch);

    return {
      status: 302,
      redirect: await API.questions.random(),
      cache: {
        maxage: 0,
        private: true,
      },
    };
  };
</script>

<Meta title="random question" noIndex />

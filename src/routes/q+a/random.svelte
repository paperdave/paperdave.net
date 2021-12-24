<script context="module" lang="ts">
  import { wrapAPI } from '$lib/api-client/singleton';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const API = wrapAPI(fetch);

    return {
      status: 302,
      redirect: await API.questions.random(),
    };
  };
</script>

<script context="module" lang="ts">
  import { browser } from '$app/env';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({}) => {
    if (browser) {
      debugger;
      const err = new Error('Intentional Crash');
      (err as any).disableReporting = true;
      throw err;
    }

    return {
      props: {},
    };
  };
</script>

<h1 style="text-align: center;">this will crash the JS on the browser side</h1>
<p style="text-align: center;">loading...</p>

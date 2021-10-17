<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ session }) => {
    return {
      props: {
        session,
      },
    };
  };
</script>

<script lang="ts">
  import { session } from '$app/stores';
</script>

<main>
  {JSON.stringify($session)}
</main>

<style lang="scss">
</style>

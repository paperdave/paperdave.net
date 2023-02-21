<script lang="ts">
  import Error404 from './Error404.svelte';
  import { page } from '$app/stores';
</script>

{#if $page.status === 404}
  <Error404 />
{:else}
  <h1>Something went wrong</h1>
  <p>Sorry, an error occurred while loading the page.</p>
{/if}

<style lang="scss">
</style>

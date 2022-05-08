<script lang="ts">
  import { page } from '$app/stores';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';

  $: fullWidth = $page.url.pathname === '/q+a/respond';
</script>

<ThemeRoot background="#101010" accent="#22c6ad" linkColor="#22c6ad" dark>
  <section class:fullWidth>
    <slot />
  </section>
</ThemeRoot>

<style lang="scss">
  section {
    flex: 1;
    margin: auto;
    padding: 1rem;
    width: 100%;
    max-width: 800px;
  }

  .fullWidth {
    max-width: 100%;
  }
</style>

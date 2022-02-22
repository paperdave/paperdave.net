<script lang="ts">
  import { page } from '$app/stores';
import ThemeRoot from '$lib/components/ThemeRoot.svelte';

  $: fullWidth = $page.path === '/q+a/respond';
</script>

<ThemeRoot background='#101010' foreground='#ffffff' accent='#22c6ad' linkColor='#22c6ad'>
  <section class:fullWidth>
    <slot />
  </section>
</ThemeRoot>

<style lang="scss">
  section {
    padding: 1rem;
    width: 100%;
    max-width: 800px;
    flex: 1;
    margin: auto;
  }

  main :global(a) {
    color: #22c6ad;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #e089c8;
    }
  }

  .fullWidth {
    max-width: 100%;
  }
</style>

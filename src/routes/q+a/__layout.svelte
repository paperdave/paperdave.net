<script>
  import { page } from '$app/stores';

  $: fullWidth = $page.path === '/q+a/respond';
</script>

<main>
  <section class:fullWidth>
    <slot />
  </section>
</main>

<style lang="scss">
  main {
    background-color: #101010;
    color: #fff;
  }
  section {
    padding: 1rem;
    max-width: 800px;
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

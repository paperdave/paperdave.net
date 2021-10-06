<script lang="ts">
  import { page } from '$app/stores';
  import { formatPageName } from './index.svelte';

  $: isHomepage = $page.path === '/learning-svelte';
  $: pageTitle = formatPageName($page.path.split('/').pop());
</script>

<main>
  {#if !isHomepage}
    <a href="/learning-svelte">
      <header>
        <strong>Learning Svelete</strong> -
        {pageTitle} - [click to go back]
      </header>
    </a>
  {/if}

  <slot />
</main>

<style lang="scss">
  main {
    background: #cecece;
  }
  header {
    background: #fafafa;
    padding: 1rem;
    &:hover {
      background: #f5f5f5;
    }
  }
</style>

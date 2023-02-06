<script>
  import { page } from '$app/stores';
  import BackButton from 'src/components/BackButton.svelte';
  import Link from 'src/lib/link/Link.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import Header from './_lib/Header.svelte';
  import RandomizeLink from './_lib/RandomizeLink.svelte';
</script>

<ThemeRoot background="#111" primary="#faa719" secondary="#ff3a32" foreground="#f0f0f0">
  <layout-container size="normal">
    {#if $page.url.pathname !== '/q+a'}
      <BackButton href="/q+a">all questions</BackButton>
    {:else}
      <BackButton />
    {/if}
    <Header />
    <layout-link-row>
      <Link href="/q+a">latest</Link>
      <!-- <Link href="/q+a/search">search</Link> -->
      <span class="soon">search (soon)</span>
      <RandomizeLink href="/io/random" />
      <Link href="/q+a/info">privacy</Link>
    </layout-link-row>
    <slot />
  </layout-container>
</ThemeRoot>

<style>
  .soon {
    color: #ffffff77;
  }
</style>

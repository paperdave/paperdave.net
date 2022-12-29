<script>
  import Link from 'src/lib/link/Link.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import Header from './_lib/Header.svelte';
  import RandomizeLink from './_lib/RandomizeLink.svelte';
</script>

<ThemeRoot background="#111" primary="#faa719" secondary="#ff3a32">
  <layout-container size="normal">
    <Header />
    <layout-link-row>
      <Link href="/q+a">latest</Link>
      <!-- <Link href="/q+a/search">search</Link> -->
      <RandomizeLink href="/io/random" />
      <Link href="/q+a?page=0">start</Link>
    </layout-link-row>
    <slot />
  </layout-container>
</ThemeRoot>

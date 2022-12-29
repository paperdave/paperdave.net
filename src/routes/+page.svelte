<script lang="ts">
  import { ThemeRoot, Button, LCHPalette } from '$lib';
  import Link from 'src/lib/link/Link.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let background = '#005544';
</script>

<ThemeRoot {background}>
  <layout-container size="normal">
    <h1>paperdave</h1>
    <p>i make art</p>
    <ul>
      <li><Link href="/videos">videos</Link></li>
      <li><Link href="/donate">donate</Link></li>
    </ul>
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 4rem;
    font-weight: 800;
    margin: 0;
  }
  .paperdave {
    --text-mono: 1;
  }
</style>

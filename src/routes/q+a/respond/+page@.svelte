<script lang="ts">
  import { browser } from '$app/environment';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import Page from './page.svelte';
</script>

<ThemeRoot background="#111" primary="#faa719" secondary="#ff3a32" foreground="#f0f0f0">
  {#if browser}
    <Page />
  {/if}
</ThemeRoot>

<style lang="scss">
</style>

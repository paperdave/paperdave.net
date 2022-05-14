<script lang="ts">
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
</script>

<ThemeRoot
  background={palette.grey[900]}
  accent={palette.yellow[800]}
  linkColor={palette.cyan[300]}>
  <div>
    <slot />
  </div>
</ThemeRoot>

<style lang="scss">
  div {
    padding: 0 2rem;
  }
</style>

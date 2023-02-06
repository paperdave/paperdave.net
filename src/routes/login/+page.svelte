<script lang="ts">
  import Button from 'src/lib/input-button/Button.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ThemeRoot>
  <layout-container>
    <h1>login</h1>

    <Button>click this button to log in (only works if you are dave)</Button>
  </layout-container>
</ThemeRoot>

<style lang="scss">
</style>

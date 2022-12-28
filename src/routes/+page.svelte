<script lang="ts">
  import { ThemeRoot, Button, LCHPalette } from '$lib';
  import type { PageData } from './$types';

  export let data: PageData;

  let background = '#65cc3d';
</script>

<ThemeRoot {background}>
  <layout-container size="normal">
    <h1>welcome to website</h1>
    <p>
      {JSON.stringify(data.featured)}
    </p>
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
  .real {
    font-size: 2rem;
  }
</style>

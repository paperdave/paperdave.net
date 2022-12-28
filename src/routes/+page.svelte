<script lang="ts">
  import { ThemeRoot, Button, LCHPalette } from '$lib';

  let background = '#65cc3d';
  let foreground = '#111111';

  let primary: string | undefined = undefined;
</script>

<ThemeRoot {background} {primary}>
  <layout-container size="normal">
    <h1>
      <div class="paperdave">paperdave</div>
      <div class="real">dave caruso</div>
    </h1>
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

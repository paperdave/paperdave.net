<script lang="ts">
  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';

  let background = palette.grey[50];
  let accent = palette.green[500];
</script>

<ThemeRoot {background} {accent}>
  <Paper marginTop>
    <Heading level="1" shadow>Theme Tester</Heading>

    <flex row>
      <input type="color" bind:value={background} />
      <input type="color" bind:value={accent} />
    </flex>

    <div style="margin-top:20rem" />
    <flex row>
      <color-square
        style:background-color="hsl(var(--bg))"
        style:border="1px solid hsl(var(--fg))" />
      <color-square style:background-color="hsl(var(--fg))" />
    </flex>
    <flex row>
      <color-square style:background-color="hsl(var(--acc-l3))" />
      <color-square style:background-color="hsl(var(--acc-l2))" />
      <color-square style:background-color="hsl(var(--acc-l1))" />
      <color-square style:background-color="hsl(var(--acc))" />
      <color-square style:background-color="hsl(var(--acc-d1))" />
      <color-square style:background-color="hsl(var(--acc-d2))" />
      <color-square style:background-color="hsl(var(--acc-d3))" />
    </flex>
    <br />
    <TextBox name="test" label="Text Box" />
    <TextBox name="test" label="Text Box" focused value="words words words" />
  </Paper>
</ThemeRoot>

<style lang="scss">
  color-square {
    display: flex;
    width: 5rem;
    height: 5rem;
  }
</style>

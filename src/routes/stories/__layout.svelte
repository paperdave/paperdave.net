<script>
  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
</script>

<ThemeRoot background={palette.purple[100]} accent={palette.purple[300]}>
  <Paper marginTop>
    <Heading center shadow level="1">stories</Heading>
    <p class="center">
      the written word shares a huge meaning. in each story, i usually push the medium to a
      different extent, hopefully to create a uniquely meaningful experience.
    </p>

    <slot />
  </Paper>
</ThemeRoot>

<style lang="scss">
  .center {
    text-align: center;
  }
</style>

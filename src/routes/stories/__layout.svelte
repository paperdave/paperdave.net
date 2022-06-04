<script>
  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import SimpleCategoryHeader from '$lib/components/SimpleCategoryHeader.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
</script>

<SimpleCategoryHeader
  title="stories"
  background={palette.purple[100]}
  accent={palette.purple[300]}
  backButtonUrl="/stories"
  backLabel="all stories">
  <svelte:fragment slot="description">
    the written word shares a huge meaning. in each story, i usually push the medium to a different
    extent, hopefully to create a uniquely meaningful experience.
  </svelte:fragment>

  <slot />
</SimpleCategoryHeader>

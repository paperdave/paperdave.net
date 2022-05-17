<script>
  import SimpleCategoryHeader from '$lib/components/SimpleCategoryHeader.svelte';
  import { palette } from '$lib/theme';
</script>

<SimpleCategoryHeader
  title="games"
  background={palette.grey[900]}
  accent={palette.green[400]}
  foreground={palette.green[100]}
  backButtonUrl="/games"
  backLabel="all games">
  <svelte:fragment slot="description">playable experiences</svelte:fragment>

  <slot />
</SimpleCategoryHeader>

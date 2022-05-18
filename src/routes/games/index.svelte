<script lang="ts">
  import SimpleCategoryHeader from '$lib/components/SimpleCategoryHeader.svelte';
  import { palette } from '$lib/theme';

  import type { Game } from '@prisma/client';
  import GameButton from './_GameButton.svelte';

  export let games: Game[];
</script>

<SimpleCategoryHeader
  title="dave's games"
  background={palette.grey[800]}
  accent={palette.green[400]}
  foreground={palette.green[100]}
  backButtonUrl="/games"
  backLabel="all games"
  paperSize="large">
  <svelte:fragment slot="description">playable experiences</svelte:fragment>
  <flex class="games full-bleed">
    {#each games as game}
      <GameButton {game} />
    {/each}
  </flex>
</SimpleCategoryHeader>

<style lang="scss">
  .games {
    margin: 2rem 0;
  }
</style>

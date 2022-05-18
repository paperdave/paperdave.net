<script lang="ts">
  import type { Game } from '@prisma/client';
  import GameCard from './_GameCard.svelte';

  export let games: Game[];
</script>

<flex class="games full-bleed">
  {#each games as game}
    <GameCard {game} />
  {/each}
</flex>

<style lang="scss">
  .games {
    margin-top: 2rem;
  }
</style>

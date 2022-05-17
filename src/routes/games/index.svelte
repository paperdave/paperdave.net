<script lang="ts">
  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
  import type { Game } from '@prisma/client';

  export let games: Game[];
</script>

{#each games as game}
  <h2>{game.title}</h2>
  {JSON.stringify(game)}
{/each}

<script lang="ts">
  import BackButton from 'src/components/BackButton.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import type { PageData } from './$types';

  import GameButton from './GameButton.svelte';

  export let data: PageData;
</script>

<ThemeRoot background={'#303030'} primary={'#51d064'}>
  <layout-container size="large">
    <BackButton />
    <h1>games</h1>
    <layout-flex class="games full-width">
      {#each data.games as game}
        <GameButton {game} />
      {/each}
    </layout-flex>
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 4rem;
    font-weight: 800;
    margin: 0;
    color: rgb(89, 225, 255);
    @include shadow(#984aff, 6);
  }
  .games {
    margin: 2rem 0;
  }
</style>

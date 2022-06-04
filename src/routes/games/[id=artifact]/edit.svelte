<script lang="ts">
  import type { Game } from '@prisma/client';
  import GamePage from './index.svelte';

  export let game: Game;

  function submit() {
    fetch(location.pathname, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
  }
</script>

<flex row>
  <flex class="col" gap>
    <pre><code>{JSON.stringify(game, null, 2)}</code></pre>

    <input type="color" bind:value={game.themeBG} />
    <input type="color" bind:value={game.themeAccent} />

    <textarea bind:value={game.description} />
    <button on:click={submit}>commit</button>
  </flex>
  <flex class="col">
    <GamePage {game} />
  </flex>
</flex>

<style lang="scss">
  .col {
    width: 50%;
    flex: 1;
    overflow: hidden;
  }
  pre {
    overflow: scroll;
    width: 100%;
  }
  textarea {
    width: 100%;
    height: 500px;
    border: 1px solid black;
  }
</style>

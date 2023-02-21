<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  let number = data.initialNumber;

  function another() {
    number = Math.floor(Math.random() * 999999) + 1;
  }
</script>

<main>
  <div>{number}</div>
  <button on:click={another}>another</button>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  div {
    font-size: 20vw;
  }

  button {
    font-size: 2vw;
    padding: 1vw;
    font-family: 'Recursive', sans-serif;

    border: 1px solid #000;
    border-radius: 0.5vw;
    background: #fff;

    cursor: pointer;
  }
</style>

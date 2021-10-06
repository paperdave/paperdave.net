<script lang="ts">
  let count = 0;
</script>

<svelte:head>
  <title>learning svelte - day 1</title>
</svelte:head>

<main>
  <p>i love svelte.</p>
  <p>
    <button on:click={() => count++}>
      button{count === 0 ? '' : ` has been clicked ${count} time${count === 1 ? '' : 's'}`}
    </button>
  </p>
  <br />
  <br />
  <br />
  <p><a href="/copyright">&copy; dave caruso 2021. all rights reserved.</a></p>
</main>

<style lang="scss">
  main {
    background: #cecece;
    color: #101010;
    padding: 2rem;
  }

  p,
  ul,
  h1 {
    margin: 1rem;
    max-width: 500px;
  }

  ul {
    padding-left: 1rem;
  }

  a {
    color: #559f42;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #2f5b42;
    }
  }

  button {
    border: 1px solid black;
    padding: 0.5rem 1rem;
  }
</style>

<script lang="ts">
  import Meta from './Meta.svelte';
</script>

<Meta title="coming soon..." color="#D71A25" />

<main>
  <h1>coming soon...</h1>
  <p>check back later</p>
  <a href="/">go to the home page</a>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #101010;
    color: white;
  }

  a {
    margin-top: 1rem;
    color: #d255b2;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #c80518;
    }
  }
</style>

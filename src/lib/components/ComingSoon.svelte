<script lang="ts">
  import Button from './Button.svelte';

  import Meta from './Meta.svelte';
  import ThemeRoot from './ThemeRoot.svelte';
</script>

<Meta title="coming soon..." color="#D71A25" noIndex />

<ThemeRoot accent="#d255b2" dark>
  <article>
    <h1>coming soon...</h1>
    <p>check back later</p>
    <Button variant="accent" href="/">go to the home page</Button>
  </article>
</ThemeRoot>

<style lang="scss">
  article {
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #101010;
    color: white;
  }
</style>

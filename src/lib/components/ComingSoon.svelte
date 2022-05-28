<script lang="ts">
  import Button from './Button.svelte';

  import Meta from './Meta.svelte';
  import Paper from './Paper.svelte';
  import ThemeRoot from './ThemeRoot.svelte';
</script>

<Meta title="coming soon..." color="#D71A25" noIndex />

<ThemeRoot accent="#d255b2" background="#101010">
  <Paper size="medium" marginTop={4}>
    <h1>coming soon...</h1>
    <p>check back later</p>
    <Button variant="accent" href="/">go to the home page</Button>
  </Paper>
</ThemeRoot>

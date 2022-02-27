<script>
  import Button from '$lib/components/Button.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
</script>

<ThemeRoot dark foreground="#0000ff">
  <article>
    <Button>Default</Button>
    <a href="/">help</a>
  </article>
</ThemeRoot>

<style>
  article {
    padding: 2rem;
  }
</style>

<script>
import Button from "$lib/components/Button.svelte";
</script>

<article>
  <Button>Default</Button>
  <Button variant='accent'>Accent</Button>
  <Button variant='link'>Link</Button>
  <Button variant='subtle'>Subtle</Button>
</article>

<style>
  article {
    padding: 2rem;
  }
</style>
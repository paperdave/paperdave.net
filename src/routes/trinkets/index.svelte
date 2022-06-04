<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
</script>

<Paper marginTop>
  <Heading level="1" center shadow>trinkets!</Heading>
  <ul>
    <li><Button center variant="accent" href="/trinkets/client-crash">client crash</Button></li>
    <li>
      <Button center variant="accent" href="/trinkets/not-implemented">not implemented</Button>
    </li>
    <li><Button center variant="accent" href="/trinkets/theme">theme</Button></li>
  </ul>
</Paper>

<style lang="scss">
  ul {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

<script>
  import Button from '$lib/components/Button.svelte';
  import ButtonGroup from '$lib/components/ButtonRow.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
</script>

<Heading level="1" shadow center>authorize</Heading>

<Paper size="form">
  <form method="post">
    <flex gap>
      <TextBox type="text" name="email" label="email" value="dave@davecode.net" disabled />
      <TextBox type="password" name="password" label="password" />
      <ButtonGroup>
        <Button text variant="link" href="/auth/new">New?</Button>
        <div />
        <Button text variant="link" href="/auth/forgot">Forgot?</Button>
        <Button text variant="accent" type="submit">Go</Button>
      </ButtonGroup>
    </flex>
  </form>
</Paper>

<style lang="scss">
  form {
    margin: 2rem 0;
  }
</style>

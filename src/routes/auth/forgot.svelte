<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import ButtonGroup from '$lib/components/ButtonRow.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import { authEmail, authPassword } from './authorization-store';
</script>

<header>
  <flex center gap>
    <Heading level="1" shadow center>i forgot</Heading>
    <noscript>
      <p>JavaScript is currently required to use authentication.</p>
    </noscript>
  </flex>
</header>

<Paper size="small">
  <form method="post">
    <flex gap>
      <TextBox type="text" name="email" label="email" bind:value={$authEmail} />

      <ButtonGroup align="right">
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

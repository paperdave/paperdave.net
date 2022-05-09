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
    <Heading level="1" shadow center>new account</Heading>
    <noscript>
      <p>JavaScript is currently required to use authentication.</p>
    </noscript>
  </flex>
</header>

<Paper size="form">
  <form method="post">
    <flex gap>
      <TextBox type="text" name="name" label="name" />
      <TextBox type="text" name="email" label="email" bind:value={$authEmail} />
      <TextBox type="password" name="password" label="password" bind:value={$authPassword} />
      <TextBox type="password" name="password2" label="confirm password" />

      <div>
        <label><input type="checkbox" name="agreeTos" />agree</label>
      </div>

      <ButtonGroup align="right">
        <Button text variant="subtle" type="submit" disabled>Coming Soon</Button>
      </ButtonGroup>
    </flex>
  </form>
</Paper>

<style lang="scss">
  form {
    margin: 2rem 0;
  }
</style>

<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import ButtonGroup from '$lib/components/ButtonRow.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import { authEmail, authPassword } from './authorization-store';

  let hasSubmitted = false;
  function submit() {
    if (hasSubmitted) return;
    setTimeout(() => {
      hasSubmitted = true;
    }, 500);
  }
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
  <form method="post" on:submit|preventDefault={submit}>
    <flex gap>
      {#if !hasSubmitted}
        <TextBox type="text" name="email" label="email" bind:value={$authEmail} disabled />

        <ButtonGroup align="right">
          <Button text variant="accent" type="submit">Go</Button>
        </ButtonGroup>
      {:else}
        <p>We've sent you an email with a link to reset your password.</p>
      {/if}
    </flex>
  </form>
</Paper>

<style lang="scss">
  form {
    margin: 2rem 0;
  }
</style>

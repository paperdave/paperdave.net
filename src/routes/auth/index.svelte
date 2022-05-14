<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { API } from '$lib/api-client/singleton';

  import Button from '$lib/components/Button.svelte';
  import ButtonGroup from '$lib/components/ButtonRow.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import { decodeRedirect } from '$lib/utils/encode-redirect';
  import { authEmail, authPassword } from './authorization-store';

  $: returnPage = $page.url.searchParams.get('r') ?? '/profile';

  export let error: string | undefined;
  let loading = false;

  async function submit() {
    if (loading) return;
    loading = true;
    error = undefined;

    const response = await API.auth.login($authEmail, $authPassword);
    if (response) {
      goto(decodeRedirect(returnPage));
      loading = false;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      loading = false;
      error = 'Invalid email or password';
    }
  }
</script>

<header>
  <flex center gap>
    <Heading level="1" shadow center>authorize</Heading>
    <noscript>
      <p>JavaScript is currently required to submit the form.</p>
    </noscript>
  </flex>
</header>

<Paper size="small">
  <form method="post" on:submit|preventDefault={submit}>
    <flex gap>
      <p class="red">
        {error ?? ''}
      </p>
      <TextBox type="text" name="email" label="email" bind:value={$authEmail} disabled bind:error />
      <TextBox
        type="password"
        name="password"
        label="password"
        bind:value={$authPassword}
        bind:error
        autofocus />
      <ButtonGroup>
        <Button text variant="subtle" href="/auth/new">New?</Button>
        <div />
        <Button text variant="subtle" href="/auth/forgot">Forgot?</Button>
        <Button text variant="accent" type="submit">Go</Button>
      </ButtonGroup>
    </flex>
  </form>
</Paper>

<style lang="scss">
  form {
    margin: 2rem 0;
  }
  .red {
    height: 1rem;
    color: red;
    text-align: center;
  }
</style>

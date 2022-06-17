<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import Button from '$lib/components/Button.svelte';
  import ButtonGroup from '$lib/components/ButtonRow.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import { api, token } from '$lib/session';
  import { decodeRedirect } from '$lib/utils/encode-redirect';
  import { authEmail, authPassword } from './authorization-store';

  $: returnPage = $page.url.searchParams.get('r') ?? '/';

  export let error: string | undefined;
  let loading = false;

  async function submit() {
    if (loading) return;
    loading = true;
    error = undefined;

    const response = await api.post('/auth/api/login', {
      json: {
        email: $authEmail,
        password: $authPassword,
      },
    });
    if (response.error) {
      error = response.error;
      loading = false;
    } else {
      api.setToken(response.token);
      goto(decodeRedirect(returnPage));
    }
  }

  if ($token) {
    goto(decodeRedirect($page.url.searchParams.get('r') ?? '/'));
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
      <TextBox
        type="text"
        name="email"
        label="email"
        bind:value={$authEmail}
        disabled={true || loading}
        bind:error />
      <TextBox
        type="password"
        name="password"
        label="password"
        bind:value={$authPassword}
        bind:error
        disabled={loading}
        autofocus />
      <ButtonGroup>
        <Button text variant="subtle" href="/auth/new" disabled={loading}>New?</Button>
        <div />
        <Button text variant="subtle" href="/auth/forgot" disabled={loading}>Forgot?</Button>
        <Button text variant="accent" type="submit" disabled={loading}>Go</Button>
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

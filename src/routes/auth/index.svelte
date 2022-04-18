<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { API } from '$lib/api-client/singleton';
  import { decodeRedirect } from '$lib/utils/encode-redirect';
  import Meta from '$lib/components/Meta.svelte';

  $: returnPage = $page.url.searchParams.get('r') ?? '/profile';

  let email = 'dave@davecode.net';
  let password = '';

  let isLoading = false;
  let isFailedLogin = false;

  async function submit(ev: Event) {
    if (isLoading) return;

    isLoading = true;
    isFailedLogin = false;
    ev.preventDefault();

    const response = await API.auth.login(email, password);

    if (response) {
      goto(decodeRedirect(returnPage));
      isLoading = false;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      isLoading = false;
      isFailedLogin = true;
      password = '';
    }
  }
</script>

<Meta title="authorize" />

<form on:submit={submit} class:isLoading>
  <h1>authorize</h1>
  {#if isFailedLogin}
    <p>Login failed, email or password is incorrect.</p>
  {/if}
  <label for="email">email</label>
  <input disabled id="email" name="email" type="text" bind:value={email} readonly />
  <label for="password">password</label>
  <input
    disabled={isLoading}
    id="password"
    name="password"
    type="password"
    bind:value={password}
    required />
  <div class="link-container">
    <a href="/auth/forgot-password">forgot password</a>
  </div>
  <div class="button-container">
    <button disabled={isLoading} type="submit">go</button>
  </div>
</form>

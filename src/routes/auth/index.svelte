<script lang="ts">
  import { session, page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { API } from '$lib/api-client/singleton';
  import { decodeRedirect } from '$lib/utils/encodeRedirect';

  $: returnPage = $page.query.get('r') ?? '/profile';

  let email = 'dave@davecode.me';
  let password = '';

  let isLoading = false;
  let isFailedLogin = false;

  async function submit(ev: Event) {
    isFailedLogin = false;
    ev.preventDefault();

    const response = await API.auth.login(email, password);

    isLoading = false;

    if (response) {
      goto(decodeRedirect(returnPage));
    } else {
      isFailedLogin = true;
    }
  }
</script>

<form on:submit={submit} class:isLoading>
  <h1>authorize</h1>
  {#if isFailedLogin}
    <p>Login failed, email or password is incorrect.</p>
  {/if}
  <label for="email">email</label>
  <input id="email" name="email" type="text" bind:value={email} disabled readonly />
  <label for="password">password</label>
  <input id="password" name="password" type="password" bind:value={password} required />
  <div class="link-container">
    <a href="/auth/forgot-password">forgot password</a>
  </div>
  <div class="button-container">
    <button type="submit">go</button>
  </div>
</form>

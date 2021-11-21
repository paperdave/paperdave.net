<script lang="ts">
  import { session, page } from '$app/stores';
  import { goto } from '$app/navigation';

  $: returnPage = $page.query.get('r') ?? '/profile';

  let form: HTMLFormElement;

  let email = 'dave@davecode.me';
  let password = '';

  let isLoading = false;
  let isFailedLogin = false;

  async function submit(ev: Event) {
    isFailedLogin = false;
    ev.preventDefault();

    let formData = new FormData(form);

    formData.set('email', email);

    let result = await fetch('/auth/submit', {
      method: 'POST',
      body: formData,
    }).then((x) => x.json());

    isLoading = false;

    if (result.success) {
      // do a thing with token
      session.set({
        ...$session,
        user: result.userData,
      });

      goto(decodeURIComponent(returnPage));
    } else {
      isFailedLogin = true;
    }
  }
</script>

<form bind:this={form} on:submit={submit} class:isLoading>
  <noscript>Currently, this form requires JavaScript to submit it.</noscript>
  <input type="hidden" name="type" value="login" />
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

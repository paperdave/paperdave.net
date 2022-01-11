<script lang="ts">
  let form: HTMLFormElement;
  let isLoading = false;
  let isSubmit = false;

  let email = 'dave@davecode.net';

  async function submit(ev: Event) {
    ev.preventDefault();

    let formData = new FormData(form);

    formData.set('email', email);

    isLoading = false;
    isSubmit = true;
  }
</script>

{#if !isSubmit}
  <form bind:this={form} on:submit={submit} class:isLoading>
    <noscript>Currently, this form requires JavaScript to submit it.</noscript>
    <input type="hidden" name="type" value="forgot-password" />
    <h1>forgot password</h1>
    <p>
      this will send a link to your email to reset your password. if you have no access to your
      email, contact support.
    </p>
    <label for="email">email</label>
    <input id="email" name="email" type="text" bind:value={email} disabled readonly />
    <div class="button-container">
      <button type="submit">go</button>
    </div>
  </form>
{:else}
  <form>
    <h1>forgot password</h1>
    <p>a link to reset your password has been sent to your email.</p>
    <p>
      <a href="/auth">sign in</a>
    </p>
  </form>
{/if}

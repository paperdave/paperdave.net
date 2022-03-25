<script context="module" lang="ts">
  export const load = restrictedPage([]);
</script>

<script lang="ts">
  import { user } from '$lib/api-client/session';
  import { API } from '$lib/api-client/singleton';

  import BackButton from '$lib/components/BackButton.svelte';
  import Button from '$lib/components/Button.svelte';
  import { restrictedPage } from '$lib/utils/restricted-page';

  function logout() {
    API.auth.logout();
  }
</script>

<article>
  <BackButton position="corner" />
  <h1>your profile</h1>
  <Button on:click={logout}>Logout</Button>
  <pre><code
      >{JSON.stringify($user?.toJSON(), null, 2)}
    </code>
  </pre>

  <h2>things</h2>
  <a href="/admin">admin stuff</a>
</article>

<style lang="scss">
  h1 {
    margin-top: 2rem;
  }
  article {
    padding: 2rem;
  }
</style>

<script context="module" lang="ts">
  export const load = restrictedPage([]);
</script>

<script lang="ts">
  import { expires, token, user } from '$lib/api-client/session';

  import BackButton from '$lib/components/BackButton.svelte';
  import { restrictedPage } from '$lib/utils/client';
  import { formatDate } from '$lib/utils/date';
</script>

<main>
  <BackButton position="corner" />
  <h1>your profile</h1>
  <button>logout (not supported yet)</button>
  <pre>
    <code>
      {JSON.stringify($user?.toJSON(), null, 2)}
    </code>
  </pre>

  <code>
    your token: {$token}
  </code>

  <code>
    expires on: {$expires ? formatDate(new Date($expires), 'date-time') : 'unknown'}
  </code>
</main>

<style lang="scss">
  main {
    padding: 2rem;
  }
  h1 {
    margin-top: 2rem;
  }
  code {
    display: block;
  }
</style>

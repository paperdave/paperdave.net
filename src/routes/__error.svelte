<script context="module" lang="ts">
  import type { ErrorLoad } from '@sveltejs/kit';

  export const load: ErrorLoad = async ({ status, error }) => {
    return {
      props: {
        status: status,
        message: String(error?.message),
        stack: error?.stack,
      },
    };
  };
</script>

<script lang="ts">
  import ErrorPage, { ErrorPageVariant } from '$lib/components/ErrorPage.svelte';

  export let status: number;
  export let message: string;
  export let stack: string;

  const variant: ErrorPageVariant =
    status === 404 ? 'NOT_FOUND' : status >= 500 ? 'ERROR' : status >= 400 ? 'ERROR' : 'UNKNOWN';

  const error: Error = {
    name: 'Error',
    message,
    stack,
  };
</script>

<ErrorPage {variant} error={status === 404 ? null : error}>
  {#if status === 404}
    <h1>wrong url / broken link</h1>
    <p>
      the thing you are trying to find either doesn't exist, is under a different filename, or has
      disappeared...
    </p>
  {:else if status >= 500}
    <h1>code bad / my fault</h1>
    <p>there was an error processing your request, please try again later.</p>
  {:else if status >= 400}
    <h1>client error / you did bad</h1>
    <p>there was an error processing your request, please try again later.</p>
    <p>
      a client error shouldn't really happen, unless you're trying to do something you shouldn't. so
      i'm gonna blame this one on you.
    </p>
    <p>
      <strong>the error</strong>: {message}
    </p>
    <p />
  {:else}
    <h1>what the heck</h1>
    <p>you did something that resulted in an error, but i have no idea what it is.</p>
    <p>
      for more context, this message shows up on things that arent server errors (5XX) and client
      errors (4XX). so i'm just as lost as you are.
    </p>
    <p>
      <strong>status code</strong>: {status}
    </p>
    <p>
      <strong>server says</strong>: {message}
    </p>
  {/if}
</ErrorPage>

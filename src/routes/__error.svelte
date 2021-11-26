<script context="module" lang="ts">
  import type { ErrorLoad } from '@sveltejs/kit';

  export const load: ErrorLoad = async ({ status, error }) => {
    return {
      props: {
        status: status,
        message: String(error?.message).toLowerCase(),
        stack: browser && error.stack,
      },
    };
  };
</script>

<script lang="ts">
  import ErrorPage from '$lib/components/ErrorPage.svelte';
  import { browser } from '$app/env';

  export let status: number;
  export let message: string;
  export let stack: string;

  const variant =
    status === 404 ? 'not-found' : status >= 500 ? 'server' : status >= 400 ? 'client' : 'unknown';
</script>

<ErrorPage {variant}>
  {#if status === 404}
    <h1>wrong url / broken link</h1>
    <p>
      the thing you are trying to find either doesn't exist, is under a different filename, or has
      disappeared...
    </p>
    <p>
      <em>
        please note that this website is under a full rewrite, see the home page for more details.
      </em>
    </p>
  {:else if status >= 500}
    <h1>server bad / my fault</h1>
    <p>there was an error processing your request, please try again later.</p>
    <p>
      <strong>server says</strong>: {message}
    </p>
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
  {#if stack}
    <p>
      <strong>stack trace</strong>:
    </p>
    <pre>{stack}</pre>
  {/if}
</ErrorPage>

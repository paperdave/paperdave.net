<script context="module" lang="ts">
  export const load: Load = async ({ status, error, props }) => {
    return {
      props: {
        status: status,
        message: String(error?.message),
        stack: error?.stack,
        props: Object.keys(props ?? {}).length ? props : undefined,
      },
    };
  };
</script>

<script lang="ts">
  import ErrorPage, { type ErrorPageVariant } from '$lib/components/ErrorPage.svelte';
  import Heading from '$lib/components/Heading.svelte';
  import type { Load } from '@sveltejs/kit';

  export let status: number;
  export let message: string;
  export let stack: string;
  export let props: any;

  const variant: ErrorPageVariant =
    status === 404 ? 'not-found' : status >= 400 && status < 600 ? 'error' : 'unknown';

  const error: Error = {
    name: 'Error',
    message,
    stack,
  };
</script>

<ErrorPage {variant} error={status === 404 ? null : error}>
  {#if status === 404}
    <Heading level="1" shadow>wrong url / broken link</Heading>
    <p>
      the thing you are trying to find either doesn't exist, is under a different filename, or has
      disappeared...
    </p>
  {:else if status >= 500}
    <Heading level="1" shadow>code bad / my fault</Heading>
    <p>there was an error processing your request, please try again later.</p>
  {:else if status >= 400}
    <Heading level="1" shadow>client error / you did bad</Heading>
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
    <Heading level="1" shadow>what the heck</Heading>
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

  {#if status !== 404 && props}
    <p>Page Props</p>
    <pre><code>{JSON.stringify(props, null, 2)}</code></pre>
  {/if}
</ErrorPage>

<!--
  @component
  A full size error page. Contains a <h1> title, a description or the error (sourcemaps applied),
  and some links for the end user to use to navigate to the homepage, or github.
-->
<script context="module" lang="ts">
  export type ErrorPageVariant = 'error' | 'not-implemented' | 'not-found' | 'unknown';
</script>

<script lang="ts">
  import ThemeRoot from './ThemeRoot.svelte';
  import Heading from './Heading.svelte';
  import Paper from './Paper.svelte';
  import SourceMappedError from './ErrorPage/SourceMappedError.svelte';
  import { page } from '$app/stores';
  import { palette } from '$lib/theme';

  export let variant: ErrorPageVariant = 'error';
  export let error: Error | null = null;
  export let dark = false;

  const colors = {
    error: palette.red[400],
    'not-found': palette.purple[400],
    'not-implemented': palette.cyan[400],
    unknown: palette.grey[800],
  };
  const headerText = {
    error: 'code bad / my fault',
    'not-found': 'wrong url / broken link',
    'not-implemented': 'not implemented!',
    unknown: 'what the heck',
  };

  const accent = colors[variant];

  $: subject =
    'paperdave.net ' + variant === 'not-found' ? 'page not found report' : 'error report';
  $: body =
    variant === 'not-found'
      ? `error: 404 not found ${$page.url.toString()}\n\n`
      : error
      ? `error: ${error.name}: ${error.message}\n\n`
      : `error: unknown error\n\n`;
  $: mailto =
    'mailto:dave@davecode.net?subject=' +
    encodeURIComponent(subject) +
    '&body=' +
    encodeURIComponent(body);
</script>

<ThemeRoot {accent} background={palette.grey[dark ? 800 : 200]}>
  <grid class="root">
    <Paper marginTop={2}>
      <slot>
        <Heading level="1" shadow>
          {headerText[variant]}
        </Heading>
        {#if error?.message}
          <p>{error?.message}</p>
        {/if}
      </slot>

      {#if variant !== 'not-implemented' && error}
        <SourceMappedError {error} />
      {/if}

      <section class="now-what">
        <h2 class="custom">now what?</h2>
        <ul>
          <li><a href="/">home page</a></li>
          <li><a href="https://google.com">google</a></li>
          <li><a href={mailto}>send a letter</a></li>
          {#if variant === 'not-found'}
            <li><a href="https://reddit.com/r/all">browse memes</a></li>
            <!-- <li><a href="#game">play a game</a></li> -->
          {:else}
            <li>
              <a href="https://github.com/davecaruso/paperdave.net/issues">browse github issues</a>
            </li>
          {/if}
        </ul>
      </section>
    </Paper>
  </grid>
</ThemeRoot>

<style lang="scss">
  .now-what {
    margin-top: 5rem;
    h2 {
      margin-bottom: 0.5rem;
      color: hsl(var(--fg), 0.75);
      font-weight: bold;
      font-size: 1.25rem;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    li {
      padding-left: 2rem;
    }
  }
</style>

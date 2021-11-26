<script context="module" lang="ts">
  export type ErrorPageVariant = 'server' | 'client' | 'not-found' | 'unknown';
</script>

<script lang="ts">
  export let variant: ErrorPageVariant = 'client';
  export let error: Error | null = null;
</script>

<main
  class:notFound={variant === 'not-found'}
  class:server={variant === 'server'}
  class:client={variant === 'client'}>
  <section>
    <slot>
      <h1>{error?.name}</h1>
      <p>{error?.message}</p>
    </slot>

    <hr />
    <p class="now-what">now what?</p>
    <ul>
      <li><a href="/">home page</a></li>
      <li><a href="https://google.com">google</a></li>
      <li><a href="mailto:dave@davecode.me">tell me about it</a></li>
      {#if variant === 'not-found'}
        <li><a href="https://reddit.com/r/all">browse memes</a></li>
        <!-- <li><a href="#game">play a game</a></li> -->
      {:else}
        <li>
          <a href="https://github.com/davecaruso/davecode.net/issues">browse github issues</a>
        </li>
      {/if}
    </ul>
  </section>
</main>

<style lang="scss">
  main {
    background-color: #e1e1e1;
    color: black;
    font-size: 1rem;

    --color: #888888;
    --drop: #303030;

    :global {
      p,
      h1 {
        margin-bottom: 1rem;
      }

      h1 {
        text-shadow: shadow(3px, 1, var(--drop));
        color: var(--color);
        line-height: 1.15em;
        @media (max-width: 519px) {
          font-size: 8.5vw;
        }
      }

      a {
        color: var(--color);
        &:hover {
          text-decoration: underline;
        }
        &:active {
          color: #ff3a32;
        }
      }

      ul li {
        margin-left: 1.5em;

        &:before {
          content: '-';
          padding-right: 8px;
        }
      }

      pre {
        font-family: monospace;
        font-size: 0.9em;
        overflow-x: auto;
        width: 100%;
        max-width: calc(100vw - 2rem);
      }
    }
  }

  section {
    padding: 1rem;
    padding-top: 3rem;
    max-width: 38rem;
    margin: auto;
  }

  .notFound {
    --color: #00a98a;
    --drop: #005d40;
  }

  .server {
    --color: #ff4f4f;
    --drop: #c80518;
  }

  .client {
    --color: #c622a2;
    --drop: #6d007a;
  }

  hr {
    height: 3rem;
    border: none;
  }

  p.now-what {
    font-weight: bold;
    margin-bottom: 0.25rem;
    color: rgba(0, 0, 0, 0.5);
  }
</style>

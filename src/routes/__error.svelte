<script context="module" lang="ts">
  import type { ErrorLoad } from '@sveltejs/kit';

  export const load: ErrorLoad = async ({ status, error }) => {
    return {
      props: {
        status: status,
        message: String(error?.message).toLowerCase(),
        // stack: error?.stack ? error.stack.split('\n') : [],
      },
    };
  };
</script>

<script lang="ts">
  export let status: number;
  export let message: string;
</script>

<main
  class:is404={status === 404}
  class:is500={status >= 500}
  class:is400={status >= 400 && status < 500 && status !== 404}
  class:isUnknown={status < 400}>
  <section>
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
        a client error shouldn't really happen, unless you're trying to do something you shouldn't.
        so i'm gonna blame this one on you.
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

    <hr />
    <p class="now-what">now what?</p>
    <ul>
      <li><a href="/">home page</a></li>
      <li><a href="https://google.com">google</a></li>
      <li><a href="mailto:dave@davecode.me">tell me about it</a></li>
      {#if status === 404}
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

    --color: #888888;
    --drop: #303030;
  }

  section {
    padding: 1rem;
    padding-top: 3rem;
    max-width: 38rem;
    margin: auto;
  }

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

  .is404 {
    --color: #00a98a;
    --drop: #005d40;
  }

  .is500 {
    --color: #ff4f4f;
    --drop: #c80518;
  }

  .is400 {
    --color: #c622a2;
    --drop: #6d007a;
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

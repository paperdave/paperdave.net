<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import { Parser } from 'expr-eval';

  let expr: string;

  function evaluate(expr: string) {
    try {
      return Parser.evaluate(expr);
    } catch (e) {
      return e;
    }
  }

  $: result = expr ? evaluate(expr) : '';
</script>

<svelte:head>
  <title>learning svelte - day 2</title>
</svelte:head>

<main>
  <p>day two:</p>
  <p>
    lemme explain myself a tiny bit. this domain was bought yesterday, 3 years ago, and nothing was
    really on it. that felt wrong. i needed to put something on it, but developing in react was not
    the easiest thing in the world.
  </p>
  <p>
    on the side, i've been rewriting the creative toolkit ui in svelte and it's been amazing. truly
    wonderful. so i'm gonna rewrite this site in it since it barely existed anyways.
  </p>
  <p>
    so for today not much fancy stuff. i'm gonna try setting up this site behind the scenes, so for
    example you can still access <a href="/learning-svelte/day-1">day one</a> if you missed it. in
    addition to that you can see a list of all the days <a href="/learning-svelte">here</a>
  </p>
  <p>maybe i'll also write more. that could be fun.</p>
  <br />
  <br />
  <br />

  <p>
    i'll leave you with one extra thing: a showcase of one of my favorite npm modules:
    <code>expr-eval</code>.
  </p>

  <div class="margin">
    <input placeholder="Enter math:" type="text" bind:value={expr} />
    <div style="height:200px;position:relative">
      {#if result}
        <pre
          style="font-weight:bold;position:absolute"
          class:error={result instanceof Error}
          in:fly={{
            duration: 300,
            opacity: 0,
            x: 30,
            easing: quintOut,
          }}
          out:fly={{
            duration: 400,
            opacity: 0,
            x: -30,
            easing: quintOut,
          }}>{result}</pre>
      {/if}
    </div>
  </div>

  <br />
  <br />
  <br />
  <p><a href="/copyright">&copy; dave caruso 2021. all rights reserved.</a></p>
</main>

<style lang="scss">
  main {
    background: #cecece;
    color: #101010;
    padding: 2rem;
  }

  p,
  ul,
  h1,
  .margin {
    margin: 1rem;
    max-width: 500px;
  }

  ul {
    padding-left: 1rem;
  }

  a {
    color: #007205;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #13b63c;
    }
  }

  .error {
    color: red;
  }

  input {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 0.25rem;
  }
</style>

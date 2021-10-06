<script>
  import Page from './learning-svelte/day-2.svelte';
</script>

<main>
  <header>
    <h1>dave caruso's website</h1>
    <p>
      a cool thing is happening. i will update this page about once a day. if i forget to by like
      5pm est, send me an email to remind me or ping me on the discord.
    </p>

    <ul>
      <li><a href="https://discord.gg/4AbvSXV">the discord</a></li>
      <li><a href="mailto:dave@davecode.me">send email</a></li>
      <li><a href="https://react.davecode.me/q+a">question page</a></li>
    </ul>
  </header>
  <Page />
</main>

<style lang="scss">
  header {
    padding: 2rem;
  }

  p,
  ul,
  h1 {
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
      color: #2f5b42;
    }
  }

  main {
    background: #cecece;
    color: #101010;
  }
</style>

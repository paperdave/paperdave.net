<script>
  import Meta from '$lib/components/Meta.svelte';

  import Page from './blog/learning-svelte/day-7.svelte';
</script>

<Meta
  title="davecode: computer art to the limit"
  description="davecode is a creative project by dave caruso to take computer software and it's artistic and automation capabilities to the limits." />

<main>
  <header>
    <h1>dave caruso's website</h1>
    <p>
      a cool thing is happening. i will update this page about once a day. if i forget to by like
      5pm est, send me an email to remind me or ping me on the discord.
    </p>
    <p>
      <a href="/learning-svelte/day-1">[start here]</a> | <a href="/learning-svelte">[see all]</a>
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

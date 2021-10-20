<script>
  import Meta from '$lib/components/Meta.svelte';
</script>

<Meta
  title="davecode: computer art to the limit"
  description="davecode is a creative project by dave caruso to take computer software and it's artistic and automation capabilities to the limits." />

<main>
  <header>
    <h1>dave caruso's website</h1>

    <p>
      cool things are happening behind the scenes related to this website. i am rewriting the entire
      thing in svelte, a wonderful javascript framework. for now, you can check out my existance on
      other websites.
    </p>

    <ul>
      <li><a href="/discord">chat on discord</a></li>
      <li><a href="/matrix">chat on matrix</a></li>
      <li><a href="mailto:dave@davecode.me">send email</a></li>
      <li><a href="https://youtube.com/davecode">youtube</a></li>
    </ul>

    <p>existing pages</p>
    <ul>
      <li><a href="/q+a">question answer</a></li>
      <li><a href="/music">the music</a></li>
      <li><a href="/brain">brain thoughts</a></li>
      <li><a href="/now">now</a></li>
      <li><a href="/blog/learning-svelte">blog: learning svelte</a></li>
      <li>more coming very soon.</li>
    </ul>
  </header>
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
    font-weight: bold;
    color: #007205;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #2f5b42;
    }
  }

  main {
    padding: 2rem;
  }
</style>

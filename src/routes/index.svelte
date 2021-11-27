<script>
  import Meta from '$lib/components/Meta.svelte';
</script>

<Meta
  title="davecode: computer art to the limit"
  description="davecode is a creative project by dave caruso to take computer software and its artistic and automation capabilities to the limits." />

<main>
  <header>
    <h1>dave caruso's website</h1>

    <br />
    <br />
    <h2>new game: <a href="https://davecode.itch.io/phoenix-write">phoenix, write!</a></h2>
    <br /><br />

    <p>
      cool things are happening behind the scenes related to this website. i am rewriting the entire
      thing in svelte, a wonderful javascript framework. for now, you can check out my existance on
      other websites.
    </p>

    <p>pages (i'll make this homepage nicer later)</p>
    <ul>
      <li><a href="/now">what's now</a></li>
      <br />
      <li><a href="/videos">videos</a></li>
      <li><a href="/music">music</a></li>
      <li class="wip"><del>video games</del> - not ready</li>
      <li class="wip"><del>applications</del> - not ready</li>
      <li class="wip"><del>nerd gear</del> - not ready</li>
      <li><a href="/q+a">question answer</a></li>
      <br />
      <li class="wip"><del>bits & fragments</del> - not ready</li>
      <li class="wip"><del>the graveyard</del> - not ready</li>
      <br />
      <li class="wip"><del>my journal</del> - not ready</li>
      <li class="wip"><del>my brain</del> - not ready</li>
      <li class="wip"><del>my treehouse</del> - not ready</li>
      <br />
      <li class="wip"><del>amatuer mode</del> - not ready</li>
    </ul>

    <p>external links</p>
    <ul>
      <li><a href="/discord">chat on discord</a></li>
      <li><a href="mailto:dave@davecode.me">send email</a></li>
      <li><a href="https://youtube.com/davecode">youtube</a></li>
      <li><a href="https://www.tiktok.com/@dave_caruso">tiktok</a></li>
      <li><a href="https://twitch.tv/davecaruso">twitch</a> (not touched much)</li>
      <li><a href="https://twitter.com/davecode_me">twitter</a> (not touched much)</li>
      <li><a href="https://instagram.com/davecode.me">instagram</a> (not touched much)</li>
      <li><a href="/donate">give me chocolate</a></li>
    </ul>

    <br />
    <br />
    <ul>
      <li style="opacity:.25"><a href="/vault">what's the password</a></li>
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
  .wip {
    opacity: 0.5;
  }
</style>

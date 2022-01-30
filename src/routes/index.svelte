<script>
  import Meta from '$lib/components/Meta.svelte';
</script>

<Meta
  title="davecode: computer art to the limit"
  description="davecode is a creative project by dave caruso to take computer software and its artistic and automation capabilities to the limits." />

<main>
  <header>
    <svg class="icon" viewBox="0 0 93 70">
      <path opacity="0.3" d="M53 25L43.0117 6.52539L6 63L53 25Z" fill="#000000" />
      <path
        d="M92.4908 20.0408L0 70L20.5708 0L43.0117 6.52542L6 63L66.8551 13.0508L92.4908 20.0408Z"
        fill="#000000" />
    </svg>

    <h1>dave caruso</h1>
    <p>web+game developer; digital abstract artist; paper plane folder</p>
    <h2>featured</h2>
    <ul>
      <li>
        interactive story: <a href="https://deempathize.pages.dev/">deempathize</a>
      </li>
      <li>
        video: <a href="/2022-update">2022 update</a>
      </li>
      <li>
        game: <a href="https://davecode.itch.io/phoenix-write">Phoenix, WRITE!</a> (<a
          href="https://www.youtube.com/watch?v=-f-uLJ1Hgvk">trailer</a
        >)
      </li>
      <li>
        software library: <a href="https://github.com/davecaruso/structures"
          >@davecode/structures</a>
      </li>
    </ul>
    <h2>categories</h2>
    <ul>
      <li><a href="/videos">videos</a></li>
      <li><a href="/music">music</a></li>
      <li><a href="/q+a">question answer</a></li>
    </ul>
    <h2>external links</h2>
    <ul>
      <li><a href="/discord">discord</a> - community and chat zone</li>
      <li><a href="https://youtube.com/davecode">youtube</a> - video mirror</li>
      <!-- <li>
        <a href="https://www.tiktok.com/@dave_caruso">tiktok</a> - random + behind the scenes
      </li> -->
      <li><a href="https://davecode.itch.io">itch.io</a> - play my games</li>
      <!-- <li><a href="https://twitch.tv/davecaruso">twitch</a> - not used much yet</li>
      <li><a href="https://twitter.com/isdavecaruso">twitter</a> - not used much yet</li> -->
      <!-- <li><a href="https://instagram.com/isdavecaruso">instagram</a> - sneak peeks</li> -->
      <li><a href="mailto:dave@davecode.net">email</a> - if you're into that</li>
      <br />
      <li><a href="/donate">give me chocolate</a></li>
    </ul>
    <!-- 
    <p>pages (i'll make this homepage nicer later)</p>
    <ul>
      <li><a href="/now">what's now</a></li>
      <br />
  
      <li class="wip"><del>video games</del> - not ready</li>
      <li class="wip"><del>applications</del> - not ready</li>
      <li class="wip"><del>nerd gear</del> - not ready</li>
      
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

     -->
  </header>
</main>

<style lang="scss">
  main {
    background-color: #51d064;
  }
  header {
    padding: 2rem;
  }

  p,
  ul,
  h1,
  h2,
  h3 {
    margin: 1rem;
    max-width: 500px;
  }

  .icon {
    display: inline;
    height: 3rem;
    margin-bottom: 0.1rem;
    margin-left: 1rem;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 0rem;
    line-height: 100%;
  }
  h1 + p {
    margin-top: 0;
  }

  ul {
    padding-left: 1rem;
  }

  a {
    font-weight: bold;
    color: #005d40;
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

<script>
  import ThemeRoot from "$lib/components/ThemeRoot.svelte";
  import ChevonDownSVG from '$lib/svg/fluent/ChevronDown.svg?component'
</script>

<flex class='root'>
  <ThemeRoot background='#fff599' accent='#f77d0a'>
    <flex class='content' grow center>
      <article>
        <h2 class='custom'>categories</h2>
        <flex row class='two-col'>
          <flex class='col'>
            <a class='custom' href="/music">music</a>
            <a class='custom' href="/videos">videos</a>
            <a class='custom' href="/stories">stories</a>
            <a class='custom' href="/games">games</a>
            <a class='custom' href="/applications">applications</a>
          </flex>
          <flex class='col'>
            <a class='custom' href="/q+a">ask a question</a>
            <a class='custom' href="/#bts">
              behind the scenes
              <ChevonDownSVG />
            </a>
            <!-- <ul>
              bits & fragments
              journal
              thoughts
              fake admin
            </ul> -->
            <a class='custom' href="/#blocks">
              building blocks
              <ChevonDownSVG />
            </a>
            <!-- <ul>
              creative toolkit
              plugins
              nerd gear
              documentation
            </ul> -->
            <a class='custom' href='/donate'>give chocolate</a>
            <a class='custom' href='/credits'>credits</a>
          </flex>
        </flex>
      </article>
    </flex>
  </ThemeRoot>
</flex>

<style lang='scss'>
  .root {
    flex: 0 0 50rem;
  }
  h2 {
    font-size: 4rem;
    color: hsl(var(--accent-base));
    text-shadow: shadow(3px, 1, hsl(var(--accent-dark-3)));
    --text-mono: 1;
  }
  .content {
    padding: 8rem 2rem 4rem 2rem;
  }
  .two-col {
    gap: 1.5rem;
  }
  .col {
    gap: 0.25rem;
  }
  a.custom {
    display: flex;
    gap: 0.3rem;
    font-size: 2rem;
    font-weight: 600;
    text-decoration: underline hsla(var(--foreground), 0.2);

    & > :global(svg) {
      display: inline-block;
      width: 1.5rem;
    }
  }
</style>
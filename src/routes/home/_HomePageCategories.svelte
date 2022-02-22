<script>
  import ThemeRoot from "$lib/components/ThemeRoot.svelte";
  import ChevonDownSVG from '$lib/svg/fluent/ChevronDown.svg?component'
</script>

<flex class='outer'>
  <flex class='inner'>
    <ThemeRoot background='#fff599' accent='#f77d0a'>
      <!-- this is the outline -->
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio='none'
        style='position:absolute; width: 10rem; height: 100%; left: 0.5rem'
      >
        <path d="M100 0L30 42L70 100L0 100L0 0Z" fill='#fffde6' />
      </svg>

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
</flex>

<style lang='scss'>
  .outer {
    flex: 1 0 35rem;
  }
  .inner {
    position: relative;
    display: flex;
    flex: 1;
    margin-left: -20rem;
    z-index: 5;
    clip-path: polygon(
      10rem 0,
      100% 0,
      100% 100%,
      7rem 100%,
      3rem 42%,
    );
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
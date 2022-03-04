<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
  import Button from '$lib/components/Button.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import ChevonDownSVG from '$lib/svg/fluent/ChevronDown.svg';
  import ArrowLeftSVG from '$lib/svg/fluent/ArrowLeft.svg';
  import { gearRotations } from './homepage-stores';
  import HomePageCategoriesBackground from './_HomePageCategoriesBackground.svelte';
  import HomePageGearDivider from './_HomePageGearDivider.svelte';
  import { fade, scale } from 'svelte/transition';

  let currentPage: 'home' | 'blocks' | 'bts' = 'home';

  function moveGears() {
    $gearRotations += 1;
  }

  function focusBTS(ev: MouseEvent) {
    ev.preventDefault();
    currentPage = 'bts';
    moveGears();
  }

  function focusBlocks(ev: MouseEvent) {
    ev.preventDefault();
    currentPage = 'blocks';
    moveGears();
  }

  function focusHome() {
    currentPage = 'home';
    moveGears();
  }
</script>

<flex class="outer">
  <HomePageGearDivider />
  <flex class="inner">
    <ThemeRoot background="#fff599" accent="#f77d0a">
      <HomePageCategoriesBackground />

      <!-- this is the outline -->
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style="position:absolute; width: 10rem; height: 100%; left: 0.5rem">
        <path d="M100 0L30 42L70 100L0 100L0 0Z" fill="#fafafa" />
      </svg>

      <flex class="content" grow center>
        <article>
          {#if currentPage !== 'home'}
            <div
              class="back-button-container"
              in:scale={{ start: 0.6, opacity: 0, duration: 100 }}
              out:fade={{ duration: 100 }}>
              <Button variant="subtle" on:click={focusHome}>
                <ArrowLeftSVG />
              </Button>
            </div>
          {/if}
          <h2 class="custom">
            {#if currentPage === 'home'}
              categories
            {:else if currentPage === 'blocks'}
              building blocks
            {:else if currentPage === 'bts'}
              behind <br />
              the scenes
            {/if}
          </h2>
          <flex row class="two-col">
            {#if currentPage === 'home'}
              <flex class="col">
                <a class="link" href="/music">music</a>
                <a class="link" href="/videos">videos</a>
                <a disabled class="link" href="/stories">stories</a>
                <a disabled class="link" href="/games">games</a>
                <a disabled class="link" href="/applications">applications</a>
              </flex>
              <flex class="col">
                <a class="link" href="/q+a">ask a question</a>
                <!-- <a class="link" href="/#bts" on:click={focusBTS}>
                  behind the scenes
                  <ChevonDownSVG />
                </a>
                <a class="link" href="/#blocks" on:click={focusBlocks}>
                  building blocks
                  <ChevonDownSVG />
                </a> -->
                <a class="link" href="/donate">give chocolate</a>
                <a class="link" href="/credits">credits</a>
              </flex>
            {:else if currentPage === 'blocks'}
              <flex class="col">
                <a disabled class="link" href="/toolkit">creative toolkit</a>
                <a disabled class="link" href="/plugins">plugins</a>
                <a disabled class="link" href="/nerd gear">nerd gear</a>
                <a disabled class="link" href="/docs">documentation</a>
              </flex>
            {:else if currentPage === 'bts'}
              <flex class="col">
                <a disabled class="link" href="/fragments">bits & fragments</a>
                <a disabled class="link" href="/journal">journal</a>
                <a disabled class="link" href="/thoughts">thoughts</a>
                <a disabled class="link" href="/source">source code</a>
              </flex>
            {/if}
          </flex>
          <span class="more"> ...more pages coming soon </span>
        </article>
      </flex>
    </ThemeRoot>
  </flex>
</flex>

<style lang="scss">
  .back-button-container {
    position: absolute;
    top: 1rem;
    right: calc(100% + 0.5rem);
    z-index: 1;
  }
  .outer {
    position: relative;
    flex: 1 0 35rem;
  }
  .inner {
    position: relative;
    display: flex;
    flex: 1;
    margin-left: -20rem;
    z-index: 5;
    clip-path: polygon(10rem 0, 100% 0, 100% 100%, 7rem 100%, 3rem 42%);
  }
  h2 {
    --text-mono: 1;

    font-size: 4rem;
    color: hsl(var(--accent-base));
    text-shadow: shadow(3px, 1, hsl(var(--accent-dark-3)));
  }
  article {
    position: relative;
    width: 34rem;
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
  .link {
    border-radius: 5px;
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

  a[disabled] {
    pointer-events: none;
    opacity: 0.5;
    text-decoration: line-through;
  }

  .more {
    font-size: 1.5rem;
    font-weight: 600;
  }
</style>

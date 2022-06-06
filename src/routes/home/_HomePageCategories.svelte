<script lang="ts">
  // import BackButton from '$lib/components/BackButton.svelte';
  import Button from '$lib/components/Button.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { gearRotations } from './homepage-stores';
  import HomePageCategoriesBackground from './_HomePageCategoriesBackground.svelte';
  import HomePageGearDivider from './_HomePageGearDivider.svelte';
  import { fade, scale } from 'svelte/transition';
  import Icon from '$lib/components/Icon.svelte';
  import IconButton from '$lib/components/IconButton.svelte';

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

<grid class="root">
  <HomePageGearDivider />
  <grid class="inner">
    <ThemeRoot background="#fff599" accent="#f77d0a">
      <HomePageCategoriesBackground />

      <!-- this is the outline -->
      <svg
        class="side-part"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style="position:absolute; width: 10rem; height: 100%; left: 0.5rem">
        <path d="M100 0L30 42L70 100L0 100L0 0Z" fill="#fafafa" />
      </svg>

      <flex class="content" center>
        <section>
          {#if currentPage !== 'home'}
            <div
              class="back-button-container"
              in:scale={{ start: 0.6, opacity: 0, duration: 100 }}
              out:fade={{ duration: 100 }}>
              <IconButton name="keyboard_return" variant="subtle" on:click={focusHome} />
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
                <a sveltekit:prefetch class="link" href="/music">music</a>
                <a sveltekit:prefetch class="link" href="/videos">videos</a>
                <a sveltekit:prefetch class="link" href="/stories">stories</a>
                <a sveltekit:prefetch class="link" href="/games">games</a>
                <!-- <a sveltekit:prefetch class="link" href="/apps">applications</a> -->
                <span disabled class="link">applications</span>
              </flex>
              <flex class="col">
                <a sveltekit:prefetch class="link" href="/io">input/output</a>
                <span disabled class="link">nerd gear</span>
                <!-- <a sveltekit:prefetch class="link" href="/nerd-gear">nerd gear</a> -->
                <a class="link" href="/#bts" on:click={focusBTS}>behind the scenes</a>
                <a sveltekit:prefetch class="link" href="/donate">give chocolate</a>
                <a sveltekit:prefetch class="link" href="/credits">credits</a>
              </flex>
            {:else if currentPage === 'bts'}
              <flex class="col">
                <span disabled class="link" href="/fragments">bits & fragments</span>
                <span disabled class="link" href="/journal">journal</span>
                <a sveltekit:prefetch class="link" href="/trinkets">trinkets</a>
              </flex>
            {/if}
          </flex>
        </section>
      </flex>
    </ThemeRoot>
  </grid>
</grid>

<style lang="scss">
  .back-button-container {
    position: absolute;
    top: 1rem;
    right: calc(100% + 0.5rem);
    z-index: 1;
  }
  .root {
    position: relative;
    flex: 1 0 35rem;
  }
  .inner {
    z-index: 5;
    clip-path: polygon(10rem 0, 100% 0, 100% 100%, 7rem 100%, 3rem 42%);
    margin-left: -20rem;
  }
  h2 {
    --text-mono: 1;

    color: hsl(var(--acc));
    font-size: 4rem;
    text-shadow: shadow(3px, 1, hsl(var(--acc-d3)));
  }
  section {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 1rem;
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
    display: flex;
    gap: 0.3rem;
    border-radius: 5px;
    font-weight: 600;
    font-size: 2rem;
    text-decoration: underline hsla(var(--fg), 0.2);

    & > :global(svg) {
      display: inline-block;
      width: 1.5rem;
    }
  }

  span[disabled] {
    opacity: 0.5;
    pointer-events: none;
    text-decoration: line-through;
  }

  .more {
    font-weight: 600;
    font-size: 1.5rem;
  }

  @media (max-width: 1600px) {
    h2 {
      width: 100%;
      text-align: center;
    }
    .side-part {
      display: none;
    }
    .inner {
      clip-path: none;
      margin-left: 0;
      overflow: hidden;
    }
    article {
      width: 100%;
    }
    .two-col {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .col {
      flex-direction: row;
      gap: 2rem;
    }
    .more {
      text-align: center;
    }
  }

  @media (max-width: 800px) {
    .two-col {
      align-items: center;
    }
    .col {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
    }
  }

  @media (max-width: 448px) {
    h2 {
      font-size: 12vw;
    }
  }
</style>

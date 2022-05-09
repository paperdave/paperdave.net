<script lang="ts">
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { Artifact } from '$lib/structures';
  import { palette } from '$lib/theme';
  import HomePageFreshCard from './_HomePageFreshCard.svelte';

  export let list: Artifact[] = [];
</script>

<div class="outer">
  <div class="inner">
    <ThemeRoot
      background={palette.blue[400]}
      foreground={palette.grey[50]}
      accent={palette.blue[400]}>
      <!-- this is the outline -->
      <svg
        class="left-part"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style="position:absolute; width: 10rem; height: 100%; left: 0.5rem">
        <path d="M100 0L50 33L60 66L0 100L0 0Z" fill="#fafafa" />
      </svg>

      <!-- this is a square right at the bottom left -->
      <div
        class="left-part"
        style="
        position:absolute;
        left: 0;
        bottom: 0;
        height: 10rem;
        width: 0.5rem;
        background: #fafafa;
      " />

      <div class="bottom-border" />

      <div class="inner-content">
        <article>
          <h2>fresh new stuff</h2>
          <p>last updated <code>2022-04-30</code></p>
          <!-- <p>next project estimated <code>2022-04-30</code></p> -->
          <ul>
            {#each list as artifact}
              <HomePageFreshCard {artifact} />
            {/each}
          </ul>
        </article>
      </div>
    </ThemeRoot>
  </div>
</div>

<style lang="scss">
  h2 {
    font-size: 2.75rem;
  }
  .outer {
    display: flex;
    flex: 1 0 35rem;
  }
  .inner {
    display: flex;
    position: relative;
    flex: 1;
    z-index: 3;
    clip-path: polygon(10rem 0, 100% 0, 100% 100%, 0 100%, 6rem 66%, 5rem 33%);
    margin-left: -10rem;

    & > :global(theme-root) {
      flex: 1;
      background: linear-gradient(#4cc5ff, #20b8ff);
    }
  }
  .inner-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
    padding-left: 10rem;
  }
  article {
    flex: 1;
    align-items: center;
    margin: 2rem auto;
    width: 100%;
    max-width: 30rem;

    & > :where(h2, p) {
      text-shadow: shadow(3px, 1, #009def);
    }
    p {
      font-weight: bold;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0.5rem;
    width: calc(100% - 2rem);
  }
  @media (max-width: 1600px) {
    .left-part {
      display: none;
    }

    .inner-content {
      margin-bottom: 4rem;
    }
  }

  @media (min-width: 1601px) and (max-width: 1860px) {
    .bottom-border {
      position: absolute;
      bottom: 0;
      left: 0;
      background: white;
      width: 100%;
      height: 0.5rem;
    }
  }
</style>

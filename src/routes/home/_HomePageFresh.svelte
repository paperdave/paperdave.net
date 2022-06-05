<script lang="ts">
  import Paper from '$lib/components/Paper.svelte';

  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
  import type { ArtifactEntry } from '@prisma/client';
  import HomePageFreshCard from './_HomePageFreshCard.svelte';

  export let list: ArtifactEntry[] = [];
</script>

<grid class="root">
  <ThemeRoot
    background={palette.blue[400]}
    foreground={palette.grey[50]}
    accent={palette.blue[400]}>
    <section>
      <Paper size="medium" marginTop={3}>
        <h2>fresh new stuff</h2>
        <ul>
          {#each list as artifact}
            <li>
              <HomePageFreshCard {artifact} />
            </li>
          {/each}
        </ul>
      </Paper>
      <div class="left" aria-hidden="true">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style="position:absolute;width:10rem;height:100%;top:0;left:.5rem">
          <path d="M100 0L50 33L60 66L0 100L0 0Z" fill="#fafafa" />
        </svg>
        <div
          style="position:absolute;left:0;bottom:0;height:10rem;width:0.5rem;background:#fafafa;" />
      </div>
    </section>
  </ThemeRoot>
</grid>

<style lang="scss">
  .root {
    flex: 1 0 45rem;
    clip-path: polygon(10rem 0, 100% 0, 100% 100%, 0 100%, 6rem 66%, 5rem 33%);
    margin-left: -10rem;
    min-height: 36rem;
  }

  section {
    background: linear-gradient(#4cc5ff, #20b8ff);
    padding-left: 10rem;
  }

  h2 {
    font-size: 3rem;
    text-align: center;
    text-shadow: shadow(3px, 1, #009def);
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 1601px) and (max-width: 1860px) {
    section {
      border-bottom: 0.5rem solid #fafafa;
    }
  }
</style>

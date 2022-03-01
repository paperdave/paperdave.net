<script>
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { Artifact, ArtifactType, VideoArtifact } from '$lib/structures';
  import HomePageFreshCard from './_HomePageFreshCard.svelte';
</script>

<div class="outer">
  <div class="inner">
    <ThemeRoot background="#4cc5ff" accent="#20b8ff" dark>
      <!-- this is the outline -->
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style="position:absolute; width: 10rem; height: 100%; left: 0.5rem">
        <path d="M100 0L50 33L60 66L0 100L0 0Z" fill="#fafafa" />
      </svg>

      <!-- this is a square right at the bottom left -->
      <div
        style="
        position:absolute;
        left: 0;
        bottom: 0;
        height: 10rem;
        width: 0.5rem;
        background: #fafafa;
      " />

      <div class="inner-content">
        <article>
          <h2>fresh new stuff</h2>
          <p>last updated <code>2022-02-22</code></p>
          <ul>
            <HomePageFreshCard
              artifact={new Artifact({
                id: 'mayday',
                // type: ArtifactType.Video,
                // title: 'Mayday',
                // date: new Date(1645128900367),
                // thumb: new DavecodeImage({
                //   url: 'https://media.davecode.net/content/2022/mayday.jpeg',
                //   width: 1920,
                //   height: 1080,
                // }),
                // tags: new Set(['music video']),
                // visibility: 'PUBLIC',
              })} />
            <!-- <HomePageFreshCard
              artifact={GameArtifact.fromJSON({
                _v: 0,
                id: 'phoenix-write',
                title: 'Phoenix, WRITE!',
                date: 1635264000000,
                thumbnail: 'https://media.davecode.net/content/2021/phoenix-write.png',
                // blurhash: 'LIK[ib00GX}u00^+IqrXF]xG$%Ee',
                type: 'game',
                visibility: 'PUBLIC',
              })} /> -->
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
    flex: 1 0 35rem;
    display: flex;
  }
  .inner {
    position: relative;
    display: flex;
    flex: 1;
    margin-left: -10rem;
    clip-path: polygon(10rem 0, 100% 0, 100% 100%, 0 100%, 6rem 66%, 5rem 33%);
    z-index: 3;

    & > :global(theme-root) {
      flex: 1;
      background: linear-gradient(#4cc5ff, #20b8ff);
    }
  }
  .inner-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding-left: 10rem;
    padding-top: 1rem;
  }
  article {
    margin: 2rem auto;
    flex: 1;
    width: 100%;
    max-width: 30rem;
    align-items: center;

    & > :where(h2, p) {
      text-shadow: shadow(3px, 1, #009def);
    }
    p {
      font-weight: bold;
    }
  }
  ul {
    margin: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

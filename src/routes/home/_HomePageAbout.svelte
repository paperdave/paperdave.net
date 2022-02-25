<script>
  import BlurHash from '$lib/components/BlurHash.svelte';

  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import ArticleAboutDaveCaruso from './_ArticleAboutDaveCaruso.svelte';
  import HomePageAboutBackground from './_HomePageAboutBackground.svelte';
  import HomePageNonGlowyName from './_HomePageNonGlowyName.svelte';
</script>

<flex class="root">
  <ThemeRoot background="#e089c8" accent="#ac0090">
    <HomePageAboutBackground />
    <div class="outer">
      <div class="inner">
        <h2>
          <span>about the artist</span>
          <HomePageNonGlowyName />
        </h2>
        <flex row>
          <article>
            <ArticleAboutDaveCaruso />
          </article>
          <aside>
            <div class="image1-container">
              <div class="image1">
                <BlurHash
                  hash="TfJICXxuyD?^WAtRADoMVsI]axR5"
                  src="/assets/photos/2022_SeniorGrad_1.jpg"
                  alt="dave caruso face" />
              </div>
            </div>
          </aside>
        </flex>
      </div>
    </div>
  </ThemeRoot>
</flex>

<style lang="scss">
  .root {
    flex: 2.5 1 80rem;
  }

  .outer {
    position: relative;
    padding: 3rem;
    overflow: hidden;
    z-index: 10;
    margin-right: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner {
    width: 90%;
    max-width: 70rem;
  }

  article {
    max-width: 38rem;
  }

  aside {
    margin-left: 1.5rem;
    flex: 1;
    // background-color: rgba(100, 100, 100, 0.1);
  }

  h2 {
    display: flex;
    align-items: baseline;
  }

  .image1 {
    aspect-ratio: 0.76;
  }
</style>

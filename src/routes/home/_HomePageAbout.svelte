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
            <div class="img1">
              <BlurHash
                hash="TfJICXxuyD?^WAtRADoMVsI]axR5"
                src="/assets/photos/2022_SeniorGrad_1.jpg"
                alt="dave caruso face" />
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
    max-width: 80rem;
  }

  article {
    max-width: 38rem;
  }

  aside {
    margin-left: 1.5rem;
    flex: 1;
  }

  h2 {
    display: flex;
    align-items: baseline;
  }

  .img1 {
    aspect-ratio: 0.76;
    width: 13rem;
    border: 4px solid #6d007a;
  }
</style>

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
            <div class="img2">
              <BlurHash
                hash="TfJICXxuyD?^WAtRADoMVsI]axR5"
                src="/assets/photos/2022_SeniorGrad_1.jpg"
                alt="dave caruso face" />
            </div>
            <div class="img3">
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

    @media (max-width: 2400px) {
      flex: 1;
    }
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

    @media (max-width: 2400px) {
      margin-right: 0;
    }
  }

  .inner {
    width: 90%;
    max-width: 80rem;
  }

  article {
    max-width: 38rem;
  }

  aside {
    position: relative;
    margin-left: 1.5rem;
    flex: 1;
  }

  h2 {
    display: flex;
    align-items: baseline;

    @media (max-width: 1000px) {
      flex-direction: column;
    }
  }

  .img1 {
    position: absolute;
    aspect-ratio: 0.76;
    width: 13rem;
    border: 4px solid #6d007a;
  }

  .img2 {
    position: absolute;
    aspect-ratio: 1;
    width: 13rem;
    border: 4px solid #6d007a;
    left: 17rem;
    top: -8rem;
  }

  .img3 {
    position: absolute;
    aspect-ratio: 1.5;
    height: 13rem;
    border: 4px solid #6d007a;
    left: 15rem;
    top: 8rem;
  }
</style>

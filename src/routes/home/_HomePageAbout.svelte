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
          <span class="a">about the artist</span>
          <span class="b">dave caruso</span>
        </h2>
        <flex row class="row1">
          <article>
            <div class="mobile-photo">
              <BlurHash
                hash="TfJICXxuyD?^WAtRADoMVsI]axR5"
                src="/assets/photos/2022_SeniorGrad_1.jpg"
                alt="dave caruso face" />
            </div>
            <ArticleAboutDaveCaruso />
          </article>
          <aside>
            <div class="img1">
              <BlurHash
                hash="TfJICXxuyD?^WAtRADoMVsI]axR5"
                src="/assets/photos/2022_SeniorGrad_1.jpg"
                alt="dave caruso face" />
            </div>
            <!--  I WILL ADD THESE AT SOME POINT I JUST DONT WANT TO RIGHT NOW  -->
            <!-- <div class="img2">
              <BlurHash
                hash={'L59G%OD43qH@~A9sM{R$4,Tz{_tk'}
                src="/assets/photos/Desk_Photo.jpg"
                alt="dave caruso face" />
            </div>
            <div class="img3">
              <BlurHash
                hash="TfJICXxuyD?^WAtRADoMVsI]axR5"
                src="/assets/photos/2022_SeniorGrad_1.jpg"
                alt="dave caruso face" />
            </div> -->
          </aside>
        </flex>
      </div>
    </div>
  </ThemeRoot>
</flex>

<style lang="scss">
  .root {
    flex: 2.5 1 80rem;

    @media (max-width: 1860px) {
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

    @media (max-width: 1860px) {
      margin-right: 0;
      border-top: 0.5rem solid white;
    }
  }

  .inner {
    width: 100%;
    max-width: 80rem;
  }

  .row1 {
    justify-content: center;
  }

  article {
    max-width: 38rem;
  }

  aside {
    position: relative;
    margin-left: 1.5rem;
    flex: 1;

    @media (max-width: 800px) {
      display: none;
    }
  }

  h2 {
    display: flex;
    align-items: baseline;
    white-space: nowrap;

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

  // @media (max-width: 2237px) {
  // .img2,
  // .img3 {
  //   display: none;
  // }
  aside {
    flex: 0 0 10rem;
    width: 10rem;
  }
  h2 {
    justify-content: center;
    margin-right: 0.7rem;
  }
  // }

  .mobile-photo {
    display: none;
    width: 12rem;
    margin: auto;
    max-width: calc(100% - 2rem);
    aspect-ratio: 0.76;
    border: 4px solid #6d007a;

    @media (max-width: 800px) {
      display: block;
    }
  }

  .b {
    font-size: 5rem;
    margin-left: 5rem;

    @media (max-width: 638px) {
      margin-left: 0;
      align-self: flex-end;
    }

    @media (max-width: 556px) {
      // this calculation isnt done correctly lol
      font-size: calc((100vw - 4rem) * 0.143);
    }
  }

  .a {
    @media (max-width: 556px) {
      // this calculation isnt done correctly lol
      font-size: max(calc((100vw - 4rem) * 0.07), 16px);
    }
  }
</style>

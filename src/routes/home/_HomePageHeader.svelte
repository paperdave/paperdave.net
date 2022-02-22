<script>
  import ArticleHomePageIntroduction from './_ArticleHomePageIntroduction.svelte';
  import HomePageHeaderBackground from './_HomePageHeaderBackground.svelte';
  import HomePageH1 from './_HomePageH1.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
</script>

<ThemeRoot background="#a0e3a7">
  <flex grow class='root'>
    <HomePageHeaderBackground />
    <flex grow row center>
      <header>
        <HomePageH1 />
        <article>
          <ArticleHomePageIntroduction />
        </article>
      </header>
    </flex>
  </flex>
</ThemeRoot>

<style>
  .root {
    z-index: 1;
  }
  header {
    padding: 4rem 2rem;
  }
  container {
    width: 100vw;
    max-width: 58rem;
    margin: auto;
  }
  article {
    max-width: 40rem;
    margin-top: 1rem;
  }
</style>
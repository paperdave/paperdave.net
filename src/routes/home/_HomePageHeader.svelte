<script>
  import ArticleHomePageIntroduction from './_ArticleHomePageIntroduction.svelte';
  import HomePageHeaderBackground from './_HomePageHeaderBackground.svelte';
  import HomePageH1 from './_HomePageH1.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
</script>

<flex class="root">
  <ThemeRoot background="#a0e3a7">
    <HomePageHeaderBackground />
    <flex grow row center class="border">
      <header>
        <HomePageH1 />
        <article>
          <ArticleHomePageIntroduction />
        </article>
      </header>
    </flex>
  </ThemeRoot>
</flex>

<style lang="scss">
  .root {
    flex: 2.5 1 80rem;
  }
  header {
    padding: 4rem 2rem;
  }
  .border {
    position: relative;
    z-index: 2;
    border-bottom: 0.5rem solid #fafafa;
  }
  article {
    max-width: 40rem;
    margin-top: 1rem;
  }
</style>

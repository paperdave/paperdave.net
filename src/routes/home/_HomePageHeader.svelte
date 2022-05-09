<script>
  import ArticleHomePageIntroduction from './_ArticleHomePageIntroduction.svelte';
  import HomePageHeaderBackground from './_HomePageHeaderBackground.svelte';
  import HomePageH1 from './_HomePageH1.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import { palette } from '$lib/theme';
</script>

<grid class="root">
  <ThemeRoot background={palette.green[200]}>
    <HomePageHeaderBackground />
    <header>
      <Paper marginTop>
        <HomePageH1 />
        <ArticleHomePageIntroduction />
      </Paper>
    </header>
  </ThemeRoot>
</grid>

<style lang="scss">
  .root {
    flex: 2.5 1 80rem;
    border-bottom: 0.5rem solid #fafafa;

    @media (max-width: 1600px) {
      flex: 0 0;
    }
  }

  header {
    padding: 4rem 2rem;

    @media (max-width: 800px) {
      padding: 4rem 1rem;
    }
  }
</style>

<script>
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import ArticleAboutDaveCaruso from './_ArticleAboutDaveCaruso.svelte';
  import HomePageAboutBackground from './_HomePageAboutBackground.svelte';
  import HomePageGlowyName from './_HomePageGlowyName.svelte';
</script>

<flex class="root">
  <ThemeRoot background="#e089c8" accent="#ac0090">
    <HomePageAboutBackground />
    <section>
      <h2>
        <span>about the artist</span>
        <HomePageGlowyName />
      </h2>
      <article>
        <ArticleAboutDaveCaruso />
      </article>
    </section>
  </ThemeRoot>
</flex>

<style>
  .root {
    flex: 2.5 1 80rem;
  }

  section {
    position: relative;
    padding: 3rem;
    overflow: hidden;
    z-index: 10;
    margin-right: 20rem;
  }

  article {
    max-width: 38rem;
  }

  h2 {
    display: flex;
    align-items: baseline;
  }
</style>

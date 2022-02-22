<script>
  import ThemeRoot from "$lib/components/ThemeRoot.svelte";
  import ArticleAboutDaveCaruso from "./_ArticleAboutDaveCaruso.svelte";
</script>

<flex class='root'>
  <ThemeRoot background='#e089c8' accent='#ac0090'>
  <section>
    <h2>
      <span>
        about the artist
      </span>
      <div class="my-name">
        dave caruso
      </div>
    </h2>
    <article>
      
      <ArticleAboutDaveCaruso />
    </article>
  </section>
</ThemeRoot>
</flex> 

<style>
  .root {
    flex: 1 0;
  }
  section {
    padding: 4rem 4rem 4rem 4rem;
  }
  article {
    max-width: 40rem;
  }

  h2 {
    display: flex;
    align-items: baseline;
  }

  .my-name {
    font-size: 5rem;
    margin-left: 6rem;
  }
</style>
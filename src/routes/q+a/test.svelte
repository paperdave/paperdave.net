<script>
  import QaHeader from './_QAHeader.svelte';
</script>

<main>
  <QaHeader />

  <section>
    <p>i answer anonymous questions you ask, because it's fun.</p>
    <p>
      <a href="/q+a">latest</a>
      |
      <strong>search</strong>
      |
      <a href="/q+a/random">random</a>
      |
      <a href="/q+a?page=0">start</a>
    </p>
  </section>
  <section>
    <!--  -->
  </section>
</main>

<style lang="scss">
  section {
    margin-bottom: 3rem;
  }
  p {
    margin-bottom: 1rem;
  }

  .form {
    max-width: 600px;
  }
</style>

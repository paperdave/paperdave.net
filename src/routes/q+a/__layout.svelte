<main>
  <section>
    <slot />
  </section>
</main>

<style lang="scss">
  main {
    background-color: #101010;
    color: #fff;
  }
  section {
    padding: 1rem;
    max-width: 800px;
    margin: auto;
  }

  main :global(a) {
    color: #22c6ad;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #e089c8;
    }
  }
</style>

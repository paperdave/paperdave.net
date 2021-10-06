<script lang="ts">
  export let text = 'go home';
  export let href = '/';
  export let inverted = false;
</script>

<main class:inverted>
  <a {href}>
    {text}
  </a>
</main>

<style lang="scss">
  main {
    position: relative;

    a {
      position: absolute;
      top: 0.5rem;
      left: calc(50% - 20rem);

      @media (max-width: 45rem) {
        left: 1rem;
      }

      color: rgba(0, 0, 0, 0.5);
      mix-blend-mode: multiply;
      padding: 0.25em;

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
      }
      &:active {
        background-color: rgba(0, 0, 0, 0.75);
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .inverted a {
    color: rgba(255, 255, 255, 0.5);
    mix-blend-mode: screen;
    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
      color: black;
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.75);
      color: rgba(0, 0, 0, 0.7);
    }
  }
</style>

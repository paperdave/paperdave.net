<script lang="ts">
  export let position: 'corner' | 'off-center' | 'off-center-right';

  export let text = 'go home';
  export let href = '/';
  export let inverted = false;
</script>

<main class:inverted>
  <a class="position-{position} custom" {href}>
    {text}
  </a>
</main>

<div class="spacer-{position}" />

<style lang="scss">
  main {
    position: relative;

    a {
      border-radius: 2px;
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

  .position-off-center {
    position: absolute;
    top: 0.5rem;
    left: calc(50% - 20rem);

    @media (max-width: 45rem) {
      left: 1rem;
    }
  }

  .position-off-center-right {
    position: absolute;
    top: 0.5rem;
    right: calc(50% - 20rem);

    @media (max-width: 45rem) {
      right: 1rem;
    }
  }

  .spacer-off-center-right {
    @media (max-width: 45rem) {
      height: 2rem;
    }
  }

  .position-corner {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
  }
</style>

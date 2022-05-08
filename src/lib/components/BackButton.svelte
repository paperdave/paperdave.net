<script lang="ts">
  export let position: 'corner' | 'off-center' | 'off-center-right';

  export let text = 'go home';
  export let href = '/';
</script>

<a sveltekit:prefetch class="position-{position} custom" {href}>
  {text}
</a>

<style lang="scss">
  a {
    position: relative;
    border-radius: 4px;
    padding: 0.25em;
    color: hsla(var(--foreground), 0.5);

    &:hover {
      background-color: hsla(var(--foreground), 0.5);
      color: hsl(var(--background));
    }
    &:active {
      background-color: hsla(var(--foreground), 0.75);
      color: hsla(var(--background), 0.7);
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

  .position-corner {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
  }
</style>

<script lang="ts">
  export let size: 'small' | 'medium' | 'standard' | 'xl' = 'standard';
  export let marginTop: boolean | number = false;
</script>

<flex
  center
  class="outer"
  style:margin-top={marginTop ? `${typeof marginTop === 'number' ? marginTop : 1}rem` : undefined}>
  <flex gap class="inner size-{size}">
    <slot />
  </flex>
</flex>

<style lang="scss">
  .outer {
    padding: 1rem;
  }
  .inner {
    position: relative;
    width: 100%;
    max-width: 45rem;
    height: 100%;
  }
  .size-small {
    max-width: 20rem;
  }
  .size-medium {
    max-width: 30rem;
  }
  .size-xl {
    max-width: 80rem;
  }
</style>

<script lang="ts">
  export let size: 'form' | 'default' = 'default';
  export let marginTop = false;
</script>

<flex center class="outer" class:marginTop>
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
  .marginTop {
    margin-top: 2rem;
  }
  .size-form {
    max-width: 20rem;
  }
</style>

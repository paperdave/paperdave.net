<flex center class="outer">
  <flex gap class="inner">
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
</style>

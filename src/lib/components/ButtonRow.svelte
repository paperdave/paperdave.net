<script lang="ts">
  export let align: 'left' | 'right' = 'left';
</script>

<flex gap row class="align-{align}">
  <slot />
</flex>

<style lang="scss">
  flex :global(:empty) {
    flex: 1;
  }

  .align-left {
    justify-content: flex-start;
  }
  .align-right {
    justify-content: flex-end;
  }
</style>

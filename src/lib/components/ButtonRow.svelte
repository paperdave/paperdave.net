<script lang="ts">
  export let align: 'left' | 'right' = 'left';
</script>

<div class="align-{align}">
  <slot />
</div>

<style lang="scss">
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  div :global(:empty) {
    flex: 1;
  }

  .align-left {
    justify-content: flex-start;
  }
  .align-right {
    justify-content: flex-end;
  }
</style>

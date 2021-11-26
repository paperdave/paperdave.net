<script lang="ts">
  export let label: string;
</script>

<main>
  <span>{label}</span>
  <slot />
</main>

<style lang="scss">
  main {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  span {
    flex: 0 0 10rem;
    text-align: right;
  }
  span + :global(*) {
    flex: 1 1 auto;
  }
</style>

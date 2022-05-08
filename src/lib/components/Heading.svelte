<script lang="ts">
  export let level: '1' | '2' | '3' | '4' | '5';
  export let shadow = false;
  export let center = false;
</script>

<svelte:element this={`h${level}`} class="heading" class:shadow class:center>
  <slot />
</svelte:element>

<style lang="scss">
  .shadow {
    color: hsl(var(--accent-base));
    text-shadow: shadow(3px, 0.5, hsl(var(--accent-dark-3)));
  }
  .center {
    text-align: center;
  }
</style>

<script lang="ts">
  import type { ASTNode } from 'svelte-simple-markdown';
  export let node: ASTNode;
</script>

<p class={node.type === 'input' ? 'i' : 'o'}>
  <slot />
</p>

<style lang="scss">
  p {
    margin-bottom: 0.5rem;
  }

  .i {
    color: white;
    font-weight: 400;
    font-size: 1.15em;
    font-family: 'Roboto Slab';
    --fg: var(--restore-fg);
  }
</style>

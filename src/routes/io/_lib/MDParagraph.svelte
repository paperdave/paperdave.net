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
    line-height: 1.25rem;
  }

  .i {
    color: white;
    font-weight: 400;
    font-size: 1.15em;
    font-family: 'Roboto Slab';
  }

  .o {
    --text-casual: 0.5;
    color: #51d064;
  }

  p :global(.highlight) {
    background-color: #ffff0044;
  }
</style>

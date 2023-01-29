<script lang="ts">
  import type { ASTNode } from 'svelte-simple-markdown';
  export let node: ASTNode;
</script>

<p class={node.type === 'question' ? 'q' : 'a'}>
  <slot />
</p>

<style lang="scss">
  p {
    margin-top: 0rem;
    margin-bottom: 0.6rem;
  }

  .q {
    color: white;
    font-weight: 600;
    font-size: 1.15em;
    --text-casual: 0;
  }
</style>

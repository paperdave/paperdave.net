<script lang="ts">
  import type { ASTNode } from 'svelte-simple-markdown';

  export let node: ASTNode;
</script>

<a sveltekit:prefetch class="custom" href="/{node.id}">
  <slot />
</a>

<style lang="scss">
</style>

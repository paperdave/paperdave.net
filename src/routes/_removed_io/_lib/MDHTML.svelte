<script lang="ts">
  import type { ASTNode } from 'svelte-simple-markdown';
  import MdParagraph from './MDParagraph.svelte';

  export let node: ASTNode;
</script>

<MdParagraph node={{ type: 'outut' }}>
  {@html node.data}
</MdParagraph>

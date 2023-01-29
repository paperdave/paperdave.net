<script lang="ts">
  import Link from 'src/lib/link/Link.svelte';

  export let node: any;
</script>

<Link href={node.target}><slot /></Link>

<script lang="ts">
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
</script>

<ThemeRoot accent="#22c6ad" linkColor="#22c6ad">
  <Paper>
    <slot />
  </Paper>
</ThemeRoot>

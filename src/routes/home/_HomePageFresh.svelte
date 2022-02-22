<script>
import ThemeRoot from "$lib/components/ThemeRoot.svelte";

</script>

<div class='outer'>
  <div class='inner'>
    <ThemeRoot
      background='#4cc5ff'
      accent='#20b8ff'
      foreground='white'
    >
      <h2>fresh new stuff</h2>
      <p></p>
    </ThemeRoot>
  </div>
</div>

<style lang='scss'>
  .outer {
    flex: 0.2 0 35rem;
    display: flex;
    flex-direction: column;
  }
  .inner {
    display: flex;
    flex-direction: column;
    flex: 1;
    opacity: 0.5;
    margin-left: -10rem;

    & > :global(theme-root) {
      flex: 1;
    }
  }
</style>
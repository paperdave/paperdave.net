<script lang="ts">
  import Button from 'src/lib/input-button/Button.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
</script>

<ThemeRoot background="#83ACE7" backgroundImage="linear-gradient(115deg,#9a8de4 0%,#60bbe1 100%)">
  <layout-container>
    <header>
      <h1>that page doesn't exist</h1>
      <p class="lead">don't worry, i still love you.</p>
    </header>
    <layout-button-row>
      <div />
      <Button href="/" variant="normal">let's go home</Button>
      <div />
    </layout-button-row>
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 5rem;
    font-weight: 350;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .lead {
    font-size: 1.5rem;
    text-align: center;
  }
  header {
    padding: 2rem 0;
  }
</style>

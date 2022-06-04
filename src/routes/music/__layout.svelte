<script lang="ts">
  import { page } from '$app/stores';
  import BackButton from '$lib/components/BackButton.svelte';

  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
</script>

<ThemeRoot background="#f3efc1">
  <Paper marginTop>
    <BackButton
      position="off-center"
      href={$page.url.pathname === '/music' ? '/' : '/music'}
      text={$page.url.pathname === '/music' ? 'go home' : 'all music'} />

    <header>
      <h1>the music ♫</h1>
      <p>i like making music, here's some of it.</p>
    </header>

    <slot />
  </Paper>
</ThemeRoot>

<style lang="scss">
  header {
    margin: 3rem;
    text-align: center;
  }

  h1 {
    line-height: 1.15em;
    font-size: 5rem;
    color: #faa719;
    text-shadow: shadow(3px, 1, #ce6807);
  }
</style>

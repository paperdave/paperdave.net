<script>
  import BackButton from '$lib/components/BackButton.svelte';

  import { page } from '$app/stores';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
</script>

<BackButton
  position="off-center"
  href={$page.url.pathname === '/auth' ? '/' : '/auth'}
  text={$page.url.pathname === '/auth' ? 'go home' : 'nevermind'} />

<ThemeRoot background="#f0f0f0" accent="#00a98a">
  <flex class="root">
    <slot />
  </flex>
</ThemeRoot>

<style lang="scss">
  .root {
    max-width: 40rem;
  }
</style>

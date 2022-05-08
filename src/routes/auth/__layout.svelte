<script>
  import BackButton from '$lib/components/BackButton.svelte';

  import { page } from '$app/stores';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import { palette } from '$lib/theme';
</script>

<ThemeRoot accent={palette.cyan[500]}>
  <Paper marginTop>
    <BackButton position="off-center" href={$page.url.pathname === '/auth' ? '/' : '/auth'}>
      {$page.url.pathname === '/auth' ? 'go home' : 'nevermind'}
    </BackButton>

    <slot />
  </Paper>
</ThemeRoot>

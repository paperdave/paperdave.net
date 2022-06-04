<script>
  import { page } from '$app/stores';

  import BackButton from '$lib/components/BackButton.svelte';

  import Paper from '$lib/components/Paper.svelte';

  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import VideoHeader from './_VideoHeader.svelte';
</script>

<ThemeRoot background="#005d40">
  <Paper marginTop size={$page.url.pathname === '/videos' ? 'xl' : 'large'}>
    <Paper>
      <BackButton position="corner" />
    </Paper>
    <VideoHeader />
    <slot />
  </Paper>
</ThemeRoot>

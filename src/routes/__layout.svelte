<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import { browser } from '$app/env';
  import OutOfBoundsGag from '$lib/components/OutOfBoundsGag.svelte';

  if (browser) {
    if (process.env.NODE_ENV === 'production') {
      console.log('hey nerd.');
      console.log('welcome to my website.');
      console.log('i hope you like it.');
    } else {
      console.log('hey developer');
    }
  }
</script>

<main><slot /></main>
<Footer />
<OutOfBoundsGag />

<style lang="scss" global>
  @import '../global.scss';
</style>

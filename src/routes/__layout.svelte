<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import { browser } from '$app/env';
  import OutOfBoundsGag from '$lib/components/OutOfBoundsGag.svelte';
  import { API } from '$lib/api-client/singleton';

  if (browser) {
    if (process.env.NODE_ENV === 'production') {
      console.log('hey nerd.');
      console.log('welcome to my website.');
      console.log('i hope you like it.');
    } else {
      console.log('hey developer');

      // @ts-ignore
      window.API = API;
      import('$lib/structures').then((all) => {
        // @ts-ignore
        window.s = all;
      });
    }
  }
</script>

<main><slot /></main>
<Footer />
<OutOfBoundsGag />

<style lang="scss" global>
  @import '../global.scss';
</style>

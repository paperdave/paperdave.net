<script lang="ts">
  import '../global.scss';
  import '../theme.scss';
  import Footer from '$lib/components/Footer.svelte';
  import { browser } from '$app/env';

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

<main>
  <slot />
</main>
<Footer />

<!-- <span class='oob-text'>
  <a class='custom' href="https://github.com/davecaruso/davecode.net/tree/main/src/global.scss#L17">
    why do you have such a high-res screen???
  </a>
</span> -->

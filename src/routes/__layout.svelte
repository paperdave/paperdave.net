<script lang="ts">
  import '../global.scss';
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

<span class="oob-text">
  <a class="custom" href="https://github.com/davecaruso/davecode.net/tree/main/src/global.scss#L17">
    why do you have such a high-res screen???
  </a>
</span>

<Footer />

<style lang="scss">
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .oob-text {
    display: none;
    z-index: 1337;
    position: absolute;
    right: 0;
    top: 0;
    transform: rotate(-90deg);
    transform-origin: top right;

    a {
      color: white;
      &:hover {
        color: red;
      }
    }
  }

  @media (min-width: 3880px) {
    .oob-text {
      display: block;
    }
  }
</style>

<script lang="ts">
  import '../global.scss';
  import '../theme.scss';
  import PlaneSVG from '$lib/svg/brand/Plane.svg';

  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    console.log('hey nerd.');
    console.log('welcome to my website.');
    console.log('i hope you like it.');
  }

  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.log('hey developer');

    // (window as any).API = API;
  }
</script>

<slot />

<!-- <span class='oob-text'>
  <a class='custom' href="https://github.com/davecaruso/davecode.net/tree/main/src/global.scss#L17">
    why do you have such a high-res screen???
  </a>
</span> -->

<footer>
  <flex center class="plane">
    <PlaneSVG />
  </flex>
  <div class="grow">
    <p>&copy; 2018-2022 All Rights Reserved</p>
    <p>made with <code class="love">&lt;3</code> by dave caruso</p>
  </div>
  <div class="grow" style="text-align:right">
    <!-- <a href="/center-footer" class='custom'>learn how to align a footer</a> -->
  </div>
</footer>

<style lang="scss">
  footer {
    background-color: #101010;
    color: white;
    padding: 2rem 2rem calc(env(safe-area-inset-bottom, 50px) + 2rem) 2rem;
    display: flex;

    .plane {
      margin-right: 1rem;
      & :global(svg) {
        fill: white;
        width: 2.5rem;
      }
    }
    .grow {
      flex: 1;
    }

    a {
      opacity: 0.3;

      &:hover {
        opacity: 0.6;
      }
      &:active {
        opacity: 1;
      }
    }
  }

  .love {
    color: red;
  }
</style>

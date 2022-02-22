<script lang="ts">
  import '../global.scss';
  import '../theme.scss';

  import { API } from '$lib/api-client/singleton';

  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    console.log('hey nerd.');
    console.log('welcome to my website.');
    console.log('i hope you like it.');
  }

  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.log('hey developer');

    (window as any).API = API;
  }
</script>

<slot />

<footer>
  <div>
    <p>&copy; 2018-2022 All Rights Reserved</p>
    <p>made with <code class='love'>&lt;3</code> by dave caruso</p>
  </div>
  <div style='text-align:right'>
    <!-- <a href="/center-footer" class='custom'>learn how to align a footer</a> -->
  </div>
</footer>

<style lang='scss'>
  footer {
    background-color: #101010;
    color: white;
    padding: 2rem 4rem calc(env(safe-area-inset-bottom, 50px) + 2rem) 4rem;
    display: flex;

    & > * {
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
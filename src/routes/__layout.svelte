<script lang="ts">
  import '../global.scss';
  import '../fluent.scss';

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

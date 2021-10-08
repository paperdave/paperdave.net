<script lang="ts">
  import '../global.scss';

  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    console.log('hey nerd.');
    console.log('welcome to my website.');
    console.log('i hope you like it.');
    console.log('source code https://davecode.me/src');
  }
</script>

<slot />

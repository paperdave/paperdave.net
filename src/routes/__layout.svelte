<script lang="ts">
  import '../global.scss';
  import '../fluent.scss';

  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    console.log('hey nerd.');
    console.log('welcome to my website.');
    console.log('i hope you like it.');
  }
</script>

<svelte:head>
  {#if process.env.INDEX !== 'true'}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots" content="index, follow" />
  {/if}
</svelte:head>

<slot />

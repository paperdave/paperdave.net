<script lang="ts">
  import { page } from '$app/stores';

  export let title: string;
  export let description: string | null = null;
  export let color = '#51D064';
  export let image: string | null = null;
  export let video: string | null = null;
  export let noIndex = false;
</script>

<svelte:head>
  <title>{title}</title>
  {#if description} <meta name="description" content={description} /> {/if}
  <meta name="author" content="dave caruso" />
  <meta name="copyright" content="&copy; dave caruso 2021" />
  <meta name="distribution" content="web" />
  <meta name="theme-color" content={color} />
  <meta name="keywords" content="art" />
  <meta name="powered by" content="chocolate" />
  <meta property="og:site_name" content="davecode - computer art to the limit" />
  <meta property="og:type" content={video ? 'video.other' : 'website'} />
  <meta property="og:title" content={title} />
  {#if description} <meta property="og:description" content={description} /> {/if}
  {#if video}
    <meta property="og:video" content={video} />
    <meta property="twitter:card" content="player" />
    <meta property="twitter:player" content={video} />
  {:else if image}
    <meta property="og:image" content={image} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content={image} />
  {/if}
  <meta property="og:url" content="https://davecode.net{$page.path}" />
  <link rel="canonical" href="https://davecode.net{$page.path}" />
  <link rel="icon" sizes="192x192" href="/assets/brand/icon@192.png" />
  <link rel="apple-touch-icon" href="/assets/brand/icon@152.png" />
  <meta name="msapplication-square310x310logo" content="/assets/brand/icon@310.png" />
  {#if process.env.INDEX !== 'true' && !noIndex}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots" content="index, follow" />
  {/if}
</svelte:head>

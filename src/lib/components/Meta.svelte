<!-- 
  @component
  This component handles all of the site's meta tags. I exclude some old meta tags on purpose, such
  as `X-UA-Compatible`, since IE doesn't exist. OpenGraph embeds are here for all pages, and I
  tailor their appearance specifically for Discord.
-->
<script lang="ts">
  import { page } from '$app/stores';
  import { palette } from '$lib/theme';

  /** Page Title, automatically suffixed with "- davecode" */
  export let title: string;
  /** Page Description */
  export let description: string | null = null;
  /** Site theme color / embed color. */
  export let color = palette.green[400];
  /** Image embed URL */
  export let image: string | null = null;
  /** Video embed URL */
  export let video: string | null = null;
  /** Pass true to prevent Google from Indexing this page. */
  export let noIndex = false;
</script>

<svelte:head>
  <!-- Page-Specific SEO -->
  <title>{$page.url.pathname === '/' ? title : `${title} - davecode`}</title>
  {#if description} <meta name="description" content={description} /> {/if}
  <link rel="canonical" href="https://davecode.net{$page.url.pathname}" />

  <!-- Constants -->
  <meta charset="utf-8" />
  <meta name="author" content="dave caruso" />
  <meta name="copyright" content="&copy; dave caruso 2022" />
  <meta name="distribution" content="web" />
  <meta name="keywords" content="art, entertainment, dave caruso, davecode" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="powered by" content="chocolate" />
  <meta name="dark mode extensions" content="please do not use" />

  <!-- OpenGraph and Twitter embeds. -->
  <meta property="og:site_name" content="davecode - computer art to the limit" />
  <meta property="og:type" content={video ? 'video.other' : 'website'} />
  <meta property="og:title" content={title} />
  {#if description}<meta property="og:description" content={description} />{/if}
  {#if video}
    <meta property="og:video" content={video} />
    <meta property="twitter:card" content="player" />
    <meta property="twitter:player" content={video} />
  {:else if image}
    <meta property="og:image" content={image} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content={image} />
  {/if}
  <meta property="og:url" content="https://davecode.net{$page.url.pathname}" />
  <meta name="theme-color" content={color} />

  <!-- Icon -->
  <link rel="icon" sizes="192x192" href="/assets/brand/icon@192.png" />
  <link rel="shortcut icon" href="/assets/brand/icon@192.png" />
  <link rel="apple-touch-icon" href="/assets/brand/icon@152.png" />
  <meta name="msapplication-square310x310logo" content="/assets/brand/icon@310.png" />

  <!-- SE Config -->
  {#if import.meta.env.VITE_INDEX !== 'true' && !noIndex}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots" content="index, follow" />
  {/if}
</svelte:head>

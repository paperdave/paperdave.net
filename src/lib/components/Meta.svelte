<script lang="ts">
  import { page } from '$app/stores';

  export let title: string;
  export let description: string;
  export let color = '#51D064';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content="dave caruso" />
  <meta name="copyright" content="&copy; dave caruso 2021" />
  <meta name="distribution" content="web" />
  <meta name="theme-color" content={color} />
  <meta name="keywords" content="art" />
  <meta name="powered by" content="chocolate" />
  <meta property="og:site_name" content="davecode - computer art to the limit" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://davecode.me{$page.path}" />
  <link rel="canonical" href="https://davecode.me{$page.path}" />
  <link rel="icon" type="image/png" href="/assets/brand/favicon@32.png" />
  <link rel="icon" sizes="192x192" href="/assets/brand/icon@192.png" />
  <link rel="apple-touch-icon" href="/assets/brand/icon@152.png" />
  <meta name="msapplication-square310x310logo" content="/assets/brand/icon@310.png" />
</svelte:head>

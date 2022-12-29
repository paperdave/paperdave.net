<!--
	@component
	Link component that wraps an anchor tag and adds the "active" class to the anchor tag if the link is the
	current page (SvelteKit only).
-->
<script lang="ts">
  import './link.scss';
  import { page } from '$app/stores';
  import { tryOrFallback } from '@paperdave/utils';

  export let href: string;

  $: active =
    tryOrFallback(
      () => new URL(href, $page.url.toString()).toString() === $page.url.toString(),
      false
    ) || null;
</script>

<a class="link" {href} {...$$props} class:active><slot /></a>

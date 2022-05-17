<script lang="ts">
  import { page } from '$app/stores';

  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
  import BackButton from './BackButton.svelte';

  export let title: string;

  export let backButtonUrl: string;
  export let backLabel: string;

  export let background: string | undefined = undefined;
  export let foreground: string | undefined = undefined;
  export let accent: string | undefined = undefined;
</script>

<ThemeRoot {background} {accent} {foreground}>
  <Paper marginTop>
    <Heading center shadow level="1">{title}</Heading>

    <BackButton
      position="off-center"
      href={$page.url.pathname === backButtonUrl ? '/' : backButtonUrl}
      text={$page.url.pathname === backButtonUrl ? undefined : backLabel} />

    {#if $$slots.description}
      <p class="center">
        <slot name="description" />
      </p>
    {/if}

    <slot />
  </Paper>
</ThemeRoot>

<style lang="scss">
  .center {
    text-align: center;
  }
</style>

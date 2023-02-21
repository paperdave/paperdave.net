<script lang="ts">
  import Button from '$lib/input-button/Button.svelte';
  import type { ButtonVariant } from 'src/lib/input-button/input-button.types';
  // Button Props
  export let variant: ButtonVariant = 'normal';
  export let href: string | URL | null = null;
  export let text = false;
  export let center = false;
  export let disabled = false;
  export let column = false;
  export let type = 'button';
</script>

<div class="icon-button">
  <Button {variant} {href} {text} {center} {disabled} {column} {type} {...$$props} on:click>
    <slot>bruh</slot>
  </Button>
</div>

<style lang="scss">
  .icon-button {
    display: flex;
    aspect-ratio: 1;

    & > :global(*) > :global(*) {
      font-size: 1.5em;
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;
    }
  }
</style>

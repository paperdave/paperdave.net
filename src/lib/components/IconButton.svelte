<script lang="ts">
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  export let name: string;
  // Button Props
  export let variant: 'normal' | 'accent' | 'subtle' = 'normal';
  export let href: string | URL | null = null;
  export let text = false;
  export let center = false;
  export let disabled = false;
  export let column = false;
  export let type = 'button';
</script>

<div class="icon-button">
  <Button {variant} {href} {text} {center} {disabled} {column} {type} {...$$props} on:click>
    <Icon {name} />
  </Button>
</div>

<style lang="scss">
  .icon-button {
    display: flex;
    aspect-ratio: 1;
    width: 2.2em;

    & > :global(*) {
      font-size: 1.5em;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
    }
  }
</style>

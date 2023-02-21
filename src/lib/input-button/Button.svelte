<!--
  @component
  A button is a clickable object that either refers to an action being taken (Submit aform, delete
  an item) or is used for a large clickable card-like surface. Depending on the use-case, there are
  three styles available: Normal, Subtle, and Accent.
  Passing `href` (and `disabled={false}`) will render an <a> element instead of a <button>.
-->
<script lang="ts">
  import './input-button.scss';
  import type { ButtonVariant } from './input-button.types';

  export let variant: ButtonVariant = 'normal';
  export let href: string | URL | null = null;
  export let disabled = false;
  export let type = 'button';
</script>

<input-button {variant}>
  {#if href && !disabled}
    <a href={href.toString()} on:click class="custom">
      <slot />
    </a>
  {:else}
    <button role={href ? 'link' : undefined} {type} {disabled} on:click>
      <slot />
    </button>
  {/if}
</input-button>

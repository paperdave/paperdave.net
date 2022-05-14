<script lang="ts">
  export let variant: 'normal' | 'accent' | 'subtle' = 'normal';

  export let href: string | URL | null = null;
  export let text = false;
  export let center = false;
  export let disabled = false;
  export let column = false;
  export let type = 'button';
</script>

{#if href && !disabled}
  <a
    sveltekit:prefetch
    href={href?.toString() ?? undefined}
    class="custom button-{variant}"
    class:center
    class:text
    class:column
    on:click
    {...$$restProps}>
    <slot />
  </a>
{:else}
  <button
    role={href ? 'link' : undefined}
    {type}
    {disabled}
    class="custom button-{variant}"
    class:center
    class:text
    class:column
    on:click
    {...$$restProps}>
    <slot />
  </button>
{/if}

<style lang="scss">
  .custom {
    display: flex;
    position: relative;
    appearance: none;
    transition: background-color 0.2s ease-in-out;
    border: none;
    border-radius: 0.3rem;
    padding: 0.5rem;
    color: hsl(var(--fg));
    user-select: none;
    text-decoration: none;

    &:focus {
      outline: none;
    }

    &.button-subtle {
      border: 1px solid hsla(var(--fg), 0);
      background-color: hsla(var(--fg), 0);
      &:hover {
        background-color: hsla(var(--fg), 0.1);
      }
      &:active {
        background-color: hsla(var(--fg), 0.2);
      }
      &:focus {
        border-color: hsla(var(--fg), 0.6);
      }
    }

    &.button-normal {
      border: 1px solid hsla(var(--fg), 0.2);
      background-color: hsla(var(--fg), 0.1);
      &:hover {
        background-color: hsla(var(--fg), 0.2);
      }
      &:active {
        transition-duration: 100ms;
        background-color: hsla(var(--fg), 0.4);
      }
      &:focus {
        border-color: hsla(var(--fg), 0.6);
      }
    }

    &.button-accent {
      border: 1px solid hsla(var(--fg), 0.2);
      background-color: hsla(var(--acc), 1);
      color: hsl(var(--on-acc));
      font-weight: 600;
      &:hover {
        background-color: hsla(var(--acc-l1), 1);
      }
      &:active {
        transition-duration: 100ms;
        background-color: hsla(var(--acc-l2), 1);
      }
      &:focus {
        border-color: hsla(var(--fg), 0.6);
      }
    }
  }

  .center {
    justify-content: center;
    align-items: center;
  }

  .column {
    flex-direction: column;
  }

  .text {
    padding: 0.5rem 0.75rem;
  }

  [disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
</style>

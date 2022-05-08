<script lang="ts">
  export let variant: 'normal' | 'accent' | 'link' | 'subtle' = 'normal';

  export let href: string | URL | null = null;
  export let text = false;
</script>

{#if href}
  <a {...$$restProps} href={href.toString()} class="custom button-{variant}" class:text on:click>
    <div class="content">
      <slot />
    </div>
  </a>
{:else}
  <button {...$$restProps} class="custom button-{variant}" class:text on:click>
    <div class="content">
      <slot />
    </div>
  </button>
{/if}

<style lang="scss">
  .content {
    z-index: 2;
  }

  .custom {
    display: flex;
    position: relative;
    flex-direction: column;
    appearance: none;
    border: none;
    padding: 0.5rem;
    user-select: none;
    text-decoration: none;

    &.button-link {
      color: hsl(var(--accent-base));
    }

    &::before {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      transition: background-color 0.2s ease-in-out;
      border-radius: 0.3rem;
      width: 100%;
      height: 100%;
      content: '';
    }
    &:focus {
      outline: none;
    }

    &.button-subtle,
    &.button-link {
      &::before {
        border: 1px solid hsla(var(--foreground), 0);
        background-color: hsla(var(--foreground), 0);
      }
      &:hover::before {
        background-color: hsla(var(--foreground), 0.1);
      }
      &:active::before {
        background-color: hsla(var(--foreground), 0.2);
      }
      &:focus::before {
        border-color: hsla(var(--foreground), 0.6);
      }
    }

    &.button-normal {
      &::before {
        border: 1px solid hsla(var(--foreground), 0.2);
        background-color: hsla(var(--foreground), 0.1);
      }
      &:hover::before {
        background-color: hsla(var(--foreground), 0.2);
      }
      &:active::before {
        transition-duration: 100ms;
        background-color: hsla(var(--foreground), 0.4);
      }
      &:focus::before {
        border-color: hsla(var(--foreground), 0.6);
      }
    }

    &.button-accent {
      font-weight: bold;
      &::before {
        border: 1px solid hsla(var(--foreground), 0.2);
        background-color: hsla(var(--accent-dark-1), 1);
      }
      &:hover::before {
        background-color: hsla(var(--accent-dark-2), 1);
      }
      &:active::before {
        transition-duration: 100ms;
        background-color: hsla(var(--accent-base), 1);
      }
      &:focus::before {
        border-color: hsla(var(--foreground), 0.6);
      }
    }
  }

  .text {
    padding: 0.5rem 0.75rem;
  }
</style>

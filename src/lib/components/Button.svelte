<script lang="ts">
  export let variant: 'normal' | 'accent' | 'link' | 'subtle' = 'normal';

  export let href: string | URL | null = null;
</script>

{#if href}
  <a {...$$restProps} href={href.toString()} class='custom button-{variant}'>
    <div class="content">
      <slot />
    </div>
  </a>
{:else}
  <button {...$$restProps} class='custom button-{variant}'>
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
    appearance: none;
    border: none;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    user-select: none;
    position: relative;
    z-index: 2;

    &.button-link {
      color: hsl(var(--accent-base));
    }

    &::after {
      content: '';
      display: block;
      transition: background-color 0.2s ease-in-out;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 0.3rem;
      z-index: 1;
    }
    &:focus {
      outline: none;
    }

    &.button-subtle, &.button-link {
      &::after {
        background-color: hsla(var(--foreground), 0);
        border: 1px solid hsla(var(--foreground), 0);
      }
      &:hover::after {
        background-color: hsla(var(--foreground), 0.1);
      }
      &:active::after {
        background-color: hsla(var(--foreground), 0.2);
      }
      &:focus::after {
        border-color: hsla(var(--foreground), 0.6);
      }
    }

    &.button-normal {
      &::after {
        background-color: hsla(var(--foreground), 0.1);
        border: 1px solid hsla(var(--foreground), 0.2);
      }
      &:hover::after {
        background-color: hsla(var(--foreground), 0.2);
      }
      &:active::after {
        transition-duration: 100ms;
        background-color: hsla(var(--foreground), 0.4);
      }
      &:focus::after {
        border-color: hsla(var(--foreground), 0.6);
      }
    }

    &.button-accent {
      &::after {
        background-color: hsla(var(--accent-dark-1), 1);
        border: 1px solid hsla(var(--foreground), 0.2);
      }
      &:hover::after {
        background-color: hsla(var(--accent-dark-2), 1);
      }
      &:active::after {
        transition-duration: 100ms;
        background-color: hsla(var(--accent-base), 1);
      }
      &:focus::after {
        border-color: hsla(var(--foreground), 0.6);
      }
    }
  }
</style>

<!--
  @component
  A button is a clickable object that either refers to an action being taken (Submit aform, delete
  an item) or is used for a large clickable card-like surface. Depending on the use-case, there are
  three styles available: Normal, Subtle, and Accent.
  Passing `href` (and `disabled={false}`) will render an <a> element instead of a <button>, and
  will have the `sveltekit:prefetch` attribute for fast prefetching.
-->
<script lang="ts">
  export let variant: 'normal' | 'subtle' | 'primary' | 'secondary' | 'tertiary' = 'normal';

  export let href: string | URL | null = null;
  export let center = false;
  export let disabled = false;
  export let column = false;
  export let type = 'button';
</script>

{#if href && !disabled}
  <!--
    Note: the custom class is passed to fix an internal use case on davecode.net: Links
    are styled by default, and the `custom` class is used to disable that behavior.
    Ideally we should be overriding all possible styles here, but we don't do that.
  -->
  <a href={href.toString()} class={variant} class:center class:column on:click {...$$restProps}>
    <slot />
  </a>
{:else}
  <button
    role={href ? 'link' : undefined}
    {type}
    {disabled}
    class={variant}
    class:center
    class:column
    on:click
    {...$$restProps}
  >
    <slot />
  </button>
{/if}

<style lang="scss">
  * {
    --btn: var(--bg);
    --on-btn: var(--on-bg);

    display: flex;
    position: relative;
    appearance: none;
    padding: 0.5rem;
    user-select: none;
    background-color: rgb(var(--btn));
    color: rgb(var(--on-btn));
    border: 1.5px solid rgba(var(--on-btn), 0.4);
    border-radius: 5px;
    outline: 0px solid rgba(var(--btn), 0.5);
    transition: outline-width 100ms var(--ease);
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    text-decoration: unset;
  }

  .normal,
  .subtle {
    outline-color: rgba(var(--on-bg), 0.2);
  }

  .normal {
    background-color: rgba(var(--on-bg), 0.2);
  }

  .subtle {
    border-width: 0px;
    padding: calc(0.5rem + 1.5px);
  }

  .primary {
    --btn: var(--pri);
    --on-btn: var(--on-pri);
  }

  .secondary {
    --btn: var(--sec);
    --on-btn: var(--on-sec);
  }

  .tertiary {
    --btn: var(--tri);
    --on-btn: var(--on-tri);
  }

  ::before {
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    border-radius: 5px;
    content: ' ';
    background: rgb(var(--on-btn));
    opacity: 0;
    transition: opacity 100ms var(--ease);
  }

  :focus {
    border-color: rgba(var(--on-btn), 0.7);
    outline-width: 2px;
  }

  :where(:hover, :focus)::before {
    opacity: 0.1;
  }

  :active::before {
    opacity: 0.2;
  }

  [disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
</style>

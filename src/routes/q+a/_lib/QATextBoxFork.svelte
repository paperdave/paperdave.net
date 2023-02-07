<!-- 
  THIS IS THE OLD TEXT BOX. IT HAS TEXTAREA SUPPORT WHILE THE NEW ONE DOESNT SO I'M KEEPING IT AROUND FOR NOW
-->
<script lang="ts">
  import { useId } from 'src/lib/utils';
  import { createEventDispatcher, onMount, tick } from 'svelte';

  export let type: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' = 'text';
  export let name: string | undefined = undefined;
  export let value = '';
  export let label: string | undefined = undefined;
  export let placeholder = '';
  export let autoHeight = false;
  export let maxlength: number | undefined = undefined;
  export let disabled = false;
  export let focused = false;
  export let revealed = false;
  export let autocapitalize: string | undefined = undefined;
  export let autocomplete: string | undefined = undefined;
  export let autocorrect: string | undefined = undefined;
  export let spellcheck: boolean | undefined = undefined;
  export let error: unknown = undefined;
  export let id = useId();

  export let unstable_ioTextarea = false;
  let unstable_ioTextareaHeight = 3 * 16;
  let unstable_ioTextareaMeasure: HTMLDivElement;

  const dispatch = createEventDispatcher();

  $: expanded = focused || !!value;

  let labelElem: HTMLLabelElement | undefined;
  let inputElem: HTMLInputElement | HTMLTextAreaElement | undefined;
  let root: HTMLElement | undefined;

  let labelX = 0;
  let init = true;

  onMount(async () => {
    labelX = labelElem?.offsetLeft ?? 0;
    if (document.activeElement === inputElem) {
      focused = true;
      dispatch('focus');
    }
    setTimeout(() => {
      init = false;
    }, 100);
  });

  function handleFocus() {
    focused = true;
    dispatch('focus');
  }

  function handleBlur(ev: FocusEvent) {
    const relatedTarget = ev.relatedTarget as HTMLElement;
    if (relatedTarget) {
      let parent = relatedTarget.parentElement;
      while (parent) {
        if (parent === root) {
          relatedTarget.addEventListener('blur', handleRelatedBlur);
          return;
        }
        parent = parent.parentElement;
      }
    }
    focused = false;
    value = value.trim();
    dispatch('blur');
  }

  function handleRelatedBlur(ev: FocusEvent) {
    (ev.currentTarget as HTMLElement).removeEventListener('blur', handleRelatedBlur);
    handleBlur(ev);
  }

  function onInput(ev: Event) {
    if (inputElem) {
      value = inputElem.value;
      dispatch('change', value ?? '');
      error = undefined;
    }
  }

  const INTERACTABLE_TAG_NAMES = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'];
  function handleClickFocus(ev: MouseEvent) {
    if (disabled) return;
    for (const elem of ev.composedPath()) {
      if (elem === root) {
        inputElem?.focus();
        return;
      }
      if (
        elem instanceof HTMLElement &&
        INTERACTABLE_TAG_NAMES.includes(elem.tagName) &&
        elem !== inputElem
      ) {
        focused = true;
        dispatch('focus');
        elem.addEventListener('blur', handleRelatedBlur);
        return;
      }
    }
  }

  async function updateHeight() {
    await tick();
    const height = unstable_ioTextareaMeasure.scrollHeight - 16;
    unstable_ioTextareaHeight = Math.max(height, 0) + (focused || value ? 32 : 0);
  }

  $: [value, focused] && unstable_ioTextareaMeasure && updateHeight();

  export function focus() {
    inputElem?.focus();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<layout-flex
  row
  class="textbox"
  class:init
  class:focused
  class:expanded
  class:disabled
  class:error={!!error && !disabled}
  style:--height={autoHeight
    ? 'auto'
    : unstable_ioTextarea
    ? `${unstable_ioTextareaHeight}px`
    : null}
  class:animatedHeight={unstable_ioTextarea}
  on:click={handleClickFocus}
  bind:this={root}
>
  {#if label}
    <div class="border-cover" aria-hidden="true">{label}</div>
  {/if}

  <slot name="left" />

  <div class="input-container">
    {#if label}
      <label
        bind:this={labelElem}
        for={id}
        style:--offsetX="{labelX}px"
        class:ssrExpand={expanded && labelX === 0}>{label}</label
      >
    {/if}
    {#if !unstable_ioTextarea}
      <input
        {id}
        type={revealed ? 'text' : type}
        autocapitalize={revealed ? 'off' : autocapitalize}
        autocomplete={revealed ? 'off' : autocomplete}
        autocorrect={revealed ? 'off' : autocorrect}
        spellcheck={revealed ? false : spellcheck}
        {maxlength}
        {name}
        {value}
        {disabled}
        {placeholder}
        {...$$restProps}
        bind:this={inputElem}
        on:input={onInput}
        on:focus={handleFocus}
        on:blur={handleBlur}
        on:change
      />
    {:else}
      <textarea
        {id}
        {maxlength}
        autocapitalize={revealed ? 'off' : autocapitalize}
        autocomplete={revealed ? 'off' : autocomplete}
        autocorrect={revealed ? 'off' : autocorrect}
        spellcheck={revealed ? false : spellcheck}
        {name}
        bind:value
        {disabled}
        {placeholder}
        {...$$restProps}
        bind:this={inputElem}
        on:input={onInput}
        on:focus={handleFocus}
        on:blur={handleBlur}
        on:change
      />
      <div
        class="textarea-height-measure"
        aria-hidden="true"
        bind:this={unstable_ioTextareaMeasure}
      >
        {value}.
      </div>
    {/if}
  </div>

  <slot name="right" />
</layout-flex>

<style lang="scss">
  $labelFocusScale: 75%;
  $ease2: cubic-bezier(0.1, 0.6, 0.4, 1);

  .textbox {
    position: relative;
    flex: 1;
    align-items: center;
    transition: border-color 100ms $ease, outline-color 100ms $ease, outline-width 100ms $ease;
    outline: solid 0px rgba(var(--pri), 0.6);
    border: 2px solid rgba(var(--on-bg), 0.7);
    border-radius: 0.3rem;
    background-color: rgba(var(--on-bg), 0.05);
    --height: 3rem;
    min-height: var(--height);
    max-height: var(--height);
    padding: 0;
    user-select: none;
    align-items: stretch;
  }
  .animatedHeight {
    transition: border-color 100ms $ease, outline-color 100ms $ease, outline-width 100ms $ease,
      height 200ms $ease2;
    height: var(--height);
    min-height: 3rem;
    max-height: unset;
  }

  .focused {
    outline-width: 2px;
    border-color: rgba(var(--pri), 1);
  }

  .error {
    // TODO: use theme color, but we don't have theme error colors, or really anything.
    border-color: red;
    outline-color: hsla(0, 100%, 50%, 0.4);

    label {
      color: red !important;
    }
  }

  .input-container {
    flex: 1 1 0px;
    padding: 0 0.6rem;
    width: 0px;
    display: flex;
    align-items: stretch;
    overflow: hidden;
  }

  input,
  textarea {
    border: none;
    resize: none;
    background-color: transparent;
    font-family: Recursive;
    font-size: 16px;
    width: 100%;
    font-weight: 500;
    color: rgb(var(--on-bg));
    &:focus {
      outline: none;
    }
    &::placeholder {
      transform: translateY(5px);
      opacity: 0;
      transition: opacity 100ms $ease, transform 0ms 100ms;
      color: rgb(var(--on-bg));
    }
  }

  textarea {
    padding: 0.8rem 0.6rem;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  .textarea-height-measure {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    overflow: hidden;
    pointer-events: none;
    padding: 0.8rem 0.6rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    letter-spacing: 0px;
    opacity: 0;
  }

  label {
    position: absolute;
    transform-origin: left center;
    transition: transform 175ms $ease, color 100ms $ease;
    pointer-events: none;
    color: rgba(var(--on-bg), 0.45);
    align-self: flex-start;
    height: calc(3rem - 4px);
    display: flex;
    align-items: center;
  }

  .border-cover {
    position: absolute;
    top: -5px;
    left: 0.25rem;
    transform: scaleX(0);
    transition: transform 125ms $ease;
    background: rgb(var(--bg));
    padding: 0 0.4rem;
    height: 5px;
    color: transparent;
    font-size: $labelFocusScale;

    &::after {
      position: absolute;
      top: 4px;
      left: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
      background: linear-gradient(
        to bottom,
        rgb(var(--bg)) 0%,
        rgba(var(--bg), 0.5) 70%,
        transparent 100%
      );
      width: 100%;
      height: 5px;
      content: '';
    }
  }

  .expanded,
  :global(.noscript) .textbox {
    label {
      transform: translateY(-24px) translateX(calc(0px - var(--offsetX) + 0.65rem))
        scale($labelFocusScale * 1);
      color: rgb(var(--on-bg));
    }
    .border-cover {
      transform: scaleX(1);
    }
    :where(input, textarea)::placeholder {
      transform: none;
      opacity: 0.45;
      transition-delay: 0ms;
      transition-duration: 250ms;
    }
  }

  .expanded.focused label {
    color: rgb(var(--pri));
  }

  .disabled {
    border-color: rgba(var(--on-bg), 0.4);
    background-color: rgb(var(--bg));
    color: rgba(var(--on-bg), 0.7);
  }

  .reveal {
    display: flex;
    flex: 0 0 2.5rem;
    justify-content: center;
    align-items: center;
    transform: translateZ(0.1px);
    margin: 0 0.25rem;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    color: rgba(var(--on-bg), 0.7);
    font-size: 1.5rem;
  }

  .textbox.init,
  .textbox.init * {
    transition-duration: 0ms !important;
  }

  :global(.noscript) .textbox label,
  .ssrExpand {
    position: absolute;
    left: 0.65rem;
    transform: translateY(-1.5rem) scale($labelFocusScale * 1) !important;
  }

  :global(.noscript) .textbox :where(input, textarea) {
    outline: 1px solid rgba(var(--on-bg), 0.6);
    &:focus {
      outline-color: rgba(var(--pri), 0.6);
    }
    &:hover {
      outline-color: rgba(var(--pri), 0.4);
    }
  }
</style>

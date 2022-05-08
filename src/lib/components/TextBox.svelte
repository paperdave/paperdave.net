<script lang="ts">
  import { useId } from '$lib/hooks/useId';
  import { onMount } from 'svelte';

  export let type = 'text';
  export let name: string;
  export let value = '';
  export let label = '';
  export let placeholder = '';
  export let disabled = false;
  export let readonly = false;

  let focused = false;
  let revealed = false;

  $: expanded = focused || !!value;

  let id = useId();
  let labelElem: HTMLLabelElement | undefined;

  let calculatedX = 0;

  onMount(() => {
    calculatedX = labelElem?.offsetLeft ?? 0;
  });

  function handleFocus() {
    focused = true;
  }
  function handleBlur() {
    focused = false;
  }
  function onModify(ev: Event) {
    value = (ev.currentTarget as HTMLInputElement).value;
  }
</script>

<noscript><noscript-marker /></noscript>

<flex row class="textbox" class:focused class:expanded class:disabled>
  <div class="border-cover" aria-hidden="true">{label}</div>

  <slot name="left" />

  <div class="input-container">
    <label bind:this={labelElem} for={id} style:--offsetX="{calculatedX}px">{label}</label>
    <input
      {id}
      type={revealed ? 'text' : type}
      {name}
      {value}
      {readonly}
      {disabled}
      {placeholder}
      on:input={onModify}
      on:focus={handleFocus}
      on:blur={handleBlur} />
  </div>

  {#if type === 'password'}
    <button type="button" class="reveal" on:click={() => (revealed = !revealed)}>
      {revealed ? 'Hide' : 'Show'}
    </button>
  {/if}

  <slot name="right" />
</flex>

<style lang="scss">
  $labelFocusScale: 75%;
  $easing: cubic-bezier(0.4, 0, 0.1, 1);

  .textbox {
    --textbox-accent: var(--accent-base);

    position: relative;
    align-items: center;
    transition: border-color 100ms $easing, outline-color 100ms $easing;
    outline: solid 0px hsla(var(--textbox-accent), 0.8);
    border: 2px solid hsla(var(--foreground), 0.7);
    border-radius: 0.3rem;
    background-color: var(--input-background);
    padding: 0;
    height: 3rem;
    user-select: none;
  }

  .focused.textbox {
    border-color: hsla(var(--foreground), 1);
  }

  .input-container {
    flex: 1 1 0;
    padding: 0 0.5rem;
    width: 0px;
  }

  input {
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
    &:focus {
      outline: none;
    }
    &::placeholder {
      transform: translateY(5px);
      opacity: 0;
      transition: opacity 100ms $easing, transform 0ms 100ms;
      color: hsl(var(--foreground));
    }
  }

  label {
    position: absolute;
    transform-origin: left center;
    opacity: 0.45;
    transition: transform 175ms $easing;
    pointer-events: none;
  }

  .border-cover {
    position: absolute;
    top: -2px;
    left: 0.25rem;
    transform: scaleX(0);
    transition: transform 125ms $easing;
    background: hsl(var(--background));
    padding: 0 0.4rem;
    height: 2px;
    color: transparent;
    font-size: $labelFocusScale;

    &::after {
      position: absolute;
      top: 2px;
      left: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
      background: linear-gradient(
        to bottom,
        hsl(var(--background)) 0%,
        hsla(var(--background), 0.5) 70%,
        transparent 100%
      );
      width: 100%;
      height: 5px;
      content: '';
    }
  }

  .expanded {
    label {
      transform: translateX(calc(0px - var(--offsetX) + 0.5rem + 2px)) translateY(-100%)
        scale($labelFocusScale * 1);
      opacity: 1;
    }
    .border-cover {
      transform: scaleX(1);
    }
    input::placeholder {
      transform: none;
      opacity: 0.45;
      transition-delay: 0ms;
      transition-duration: 250ms;
    }
  }

  .disabled {
    border-color: hsla(var(--foreground), 0.4);
    background-color: hsl(var(--background));
    color: hsla(var(--foreground), 0.7);
  }

  .reveal {
    aspect-ratio: 1;
    height: 100%;
  }
</style>

<!-- 
  @component
  Functions very similarly to any of the text based <input /> elements, but with a Material 2
  inspired look and feel. You can pass content to put before and after the input field by using the
  available slots `"before"` and `"after"`. Supports Themes, Accessibility, Proper Focus Control,
  SSR, clients without JS, and might even be able to bake you a cake.

  Supported `type` values:
  - text
  - password
  - email
  - search
  - tel
  - url

  See other components for the other input types.
 -->
<script lang="ts">
	import './input-textbox.scss';
	import { useId } from '$lib/utils';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { scale } from 'svelte/transition';
	// import Icon from './Icon.svelte';

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

	const dispatch = createEventDispatcher();

	$: expanded = focused || !!value;

	let labelElem: HTMLLabelElement | undefined;
	let inputElem: HTMLInputElement | HTMLTextAreaElement | undefined;
	let root: HTMLElement | undefined;

	let labelX = 0;
	let init = false;

	onMount(async () => {
		labelX = labelElem?.offsetLeft ?? 0;
		if (document.activeElement === inputElem) {
			focused = true;
			dispatch('focus');
		}
		setTimeout(() => {
			init = true;
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

	export function focus() {
		inputElem?.focus();
	}
</script>

<input-textbox
	row
	init={init || undefined}
	focused={focused || undefined}
	expanded={expanded || undefined}
	disabled={disabled || undefined}
	class:error={!!error && !disabled}
	style:--height={autoHeight ? 'auto' : null}
	on:click={handleClickFocus}
	bind:this={root}
>
	{#if label}
		<div class="cover" aria-hidden="true">{label}</div>
	{/if}

	<slot name="left" />

	<div class="main">
		{#if label}
			<label
				bind:this={labelElem}
				for={id}
				style:--offsetX="{labelX}px"
				class:ssrExpand={expanded && labelX === 0}>{label}</label
			>
		{/if}
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
	</div>

	{#if (type === 'password' && focused) || revealed}
		<button
			type="button"
			class="reveal"
			on:click={() => (revealed = !revealed)}
			transition:scale={{ duration: 100, start: 0.8 }}
		>
			<!-- <Icon name={revealed ? 'visibility_off' : 'visibility'} /> -->
		</button>
	{/if}

	<slot name="right" />
</input-textbox>

<!--
  @component
  TODO: Document Checkbox
-->
<script lang="ts">
	// Waiting on https://github.com/sveltejs/svelte/issues/2308
	import './input-checkbox.scss';
	import type { CheckboxVariant } from './input-checkbox.types';

	export let name: string | undefined = undefined;
	export let value: string | undefined = undefined;
	// export let group: string[] | undefined = undefined;
	export let checked = false;
	export let variant: CheckboxVariant = 'primary';
</script>

<input-checkbox {variant}>
	<label>
		<input {name} {value} type="checkbox" bind:checked />
		<div class="visual">
			<svg viewBox="0 0 24 24">
				<path d="M4 12L9 17L19.4 6.2" fill="none" stroke="currentColor" stroke-width="2.7" />
			</svg>
			<div class="bg" />
		</div>
		<slot />
	</label>
</input-checkbox>

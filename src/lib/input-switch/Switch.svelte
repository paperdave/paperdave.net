<!--
  @component
  TODO: Document Radio
-->
<script lang="ts">
	import './input-switch.scss';
	import type { SwitchVariant } from './input-switch.types';
	import { clamp } from '@paperdave/utils';

	export let name: string | undefined = undefined;
	export let checked: boolean = false;
	export let variant: SwitchVariant = 'primary';
	export let disabled: boolean = false;

	let drag = 0;
	let lastFew = Array(5).fill(0);
	let dragging = false;
	let dragEndTime = 0;

	function onMouseDown(ev: MouseEvent) {
		if (ev.button !== 0 || disabled) return;
		ev.preventDefault();
		const { clientX } = ev;
		dragging = true;

		function onDrag(ev2: MouseEvent) {
			const { clientX: clientX2 } = ev2;
			drag = clientX2 - clientX;
			lastFew.push(drag);
			lastFew.shift();
		}
		function onEnd(ev2: MouseEvent) {
			onDrag(ev2);
			document.removeEventListener('mousemove', onDrag);
			document.removeEventListener('mouseup', onEnd);
			if (drag === 0) {
				checked = !checked;
			} else {
				const vel = lastFew.reduce((a, b) => a + b, 0) / lastFew.length;
				console.log(vel);
				if (vel > 3) {
					checked = true;
				} else if (vel < 3) {
					checked = false;
				} else {
					checked = drag > (checked ? -4 : 8);
				}
			}
			drag = 0;
			dragEndTime = Date.now();
			dragging = false;
		}

		document.addEventListener('mousemove', onDrag);
		document.addEventListener('mouseup', onEnd);
	}

	function onChange(ev: Event) {
		if (disabled) {
			ev.preventDefault();
			return;
		}
		const input = ev.currentTarget as HTMLInputElement;
		if (dragEndTime < Date.now() - 50) {
			checked = input.checked;
		} else {
			input.checked = checked;
		}
	}
</script>

<input-switch {variant} disabled={disabled || undefined}>
	<label>
		<input type="checkbox" {name} {checked} on:change={onChange} {disabled} />
		<div class="visual" on:mousedown={onMouseDown}>
			<div class="border" />
			<div class="overlay" />
			<div
				class="dot"
				style:--drag="{checked ? clamp(drag, -14, 0) : clamp(drag, 0, 20)}px"
				class:dragging
			/>
		</div>
		<slot />
	</label>
</input-switch>

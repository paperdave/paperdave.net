<!--
  @component
  TODO: Document Radio
-->
<script lang="ts">
	import './input-radio.scss';
	import type { RadioVariant } from './input-radio.types';

	export let group: string;
	export let name: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let variant: RadioVariant = 'primary';
</script>

<input-radio {variant}>
	<label>
		<input type="radio" {name} {value} bind:group />
		<div class="visual">
			<div class="border" />
			<div class="border2" />
			<div class="inner" />
		</div>
		<slot />
	</label>
</input-radio>

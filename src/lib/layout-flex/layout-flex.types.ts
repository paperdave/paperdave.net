declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace svelte.JSX {
		interface IntrinsicElements {
			'layout-flex': {
				column: boolean;
				row: boolean;
				reverse: boolean;
				gap: boolean;
				center: boolean;
			};
		}
	}
}

export {};

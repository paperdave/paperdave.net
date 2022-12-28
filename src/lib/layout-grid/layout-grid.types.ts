declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace svelte.JSX {
		interface IntrinsicElements {
			'layout-grid': {
				center: boolean;
			};
		}
	}
}

export {};

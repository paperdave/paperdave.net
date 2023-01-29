export type ContainerSize = 'small' | 'medium' | 'large' | 'xl' | 'full' | 'normal';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace svelte.JSX {
		interface IntrinsicElements {
			'layout-container': {
				size?: ContainerSize;
			};
		}
	}
}

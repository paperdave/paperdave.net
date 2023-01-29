declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace svelte.JSX {
    interface IntrinsicElements {
      'layout-grid': IntrinsicElements['div'] & {
        center?: boolean;
      };
    }
  }
}

export {};

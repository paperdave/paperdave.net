/// <reference types="@sveltejs/kit" />

declare module '*?component' {
  const content: typeof import('*.svelte').default;
  export default content;
}

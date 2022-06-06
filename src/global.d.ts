/// <reference types="@sveltejs/kit" />

declare module '*.yaml' {
  const content: any;
  export default content;
}

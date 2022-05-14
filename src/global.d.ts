/// <reference types="@sveltejs/kit" />

declare module '*.yaml' {
  const content: any;
  export default content;
}
declare module 'html-minifier-terser/dist/htmlminifier.esm.bundle' {
  export * from 'html-minifier-terser';
}

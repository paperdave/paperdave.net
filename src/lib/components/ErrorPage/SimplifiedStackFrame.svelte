<script lang="ts">
  import { dev } from '$app/env';
  import { StackFrame } from 'stacktrace-parser';
  import { isExternal } from './source-mapping-utils';

  const githubBranch = 'main';
  const githubBase = `https://github.com/davecaruso/davecode.net/tree/${githubBranch}/`;

  export let frame: StackFrame;

  $: file = frame.file || '<unknown>';
  $: split = file.split('/');
  $: basename = split[split.length - 1];
  $: fileURL = dev
    ? `vscode://file/` + import.meta.env.SOURCE_ROOT + '\\' + file
    : githubBase + file;

  $: methodName = (frame.methodName || '<anonymous>').replace(/^async /, '');
  $: isAsync = frame.methodName?.startsWith('async ');
</script>

<li class:external={isExternal(frame)}>
  at {#if isAsync}
    <span class="async">async</span>
  {/if}
  <span class="methodName">{methodName}</span>
  —
  {#if file === '<unknown>'}
    &lt;unknown&gt;
  {:else if file.startsWith('src/')}
    <a class="file" href={fileURL} title={file}>{split.slice(1).join('/')}</a>
  {:else if file.startsWith('.svelte-kit/runtime/') || file.startsWith('runtime/')}
    <a class="file" href="https://npmjs.com/package/@sveltejs/kit" title={file}>@sveltejs/kit</a>
  {:else if file.startsWith('node_modules/')}
    <a class="file" href="https://npmjs.com/package/{split[1]}" title={file}>{split[1]}</a>
  {:else}
    <span class="file" title={file}>{basename}</span>
  {/if}
</li>

<style lang="scss">
  li {
    padding-left: 1rem;
  }
  .methodName {
    --text-slant: -7;
  }
</style>

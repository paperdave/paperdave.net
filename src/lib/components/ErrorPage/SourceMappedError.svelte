<script lang="ts">
  import { browser } from '$app/env';
  import { StackFrame } from 'stacktrace-parser';
  import Button from '../Button.svelte';
  import SimplifiedStackFrame from './SimplifiedStackFrame.svelte';
  import { createMappedSource, isExternal } from './source-mapping-utils';

  export let error: Error;

  let hideExternal = true;
</script>

<article class="root">
  {#if browser}
    {#await createMappedSource(error)}
      <p>generating stack trace...</p>
    {:then stackFrames}
      <header>
        <strong class="error-name">{error.name}</strong>:
        <span class="error-msg">{error.message}</span>
      </header>
      {#if stackFrames}
        <ul>
          {#each stackFrames as frame}
            {#if !hideExternal || !isExternal(frame)}
              <SimplifiedStackFrame {frame} />
            {/if}
          {/each}
        </ul>
        <div>
          <button on:click={() => (hideExternal = !hideExternal)}>
            {#if hideExternal}
              Show External Frames
            {:else}
              Hide External Frames
            {/if}
          </button>
        </div>
      {:else}
        <p>no stack trace available</p>
      {/if}
    {/await}
  {:else}
    <!-- TODO: SSR sourcemapping -->
    <strong>generating stack trace...</strong>
  {/if}
</article>

<style lang="scss">
  .root {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  header {
    font-size: 1.15rem;
  }
  button {
    margin-top: 0.5rem;
    color: hsla(var(--fg), 0.5);
    text-decoration: underline dashed 1px;
    text-underline-offset: 1px;
    &:hover {
      color: hsla(var(--fg), 0.75);
    }
  }
</style>

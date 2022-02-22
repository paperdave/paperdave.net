<script context="module" lang="ts">
  import { SourceMapConsumer } from 'source-map-js';
  import { parse as parseStackTrace, StackFrame } from 'stacktrace-parser';

  export type ErrorPageVariant = 'ERROR' | 'NOT_IMPLEMENTED' | 'NOT_FOUND' | 'UNKNOWN';
  const sources = new Map<string, SourceMapConsumer>();

  /** Creates a mapped source object */
  async function createMappedSource(error: Error) {
    if (!error.stack) {
      return null;
    }

    const stack = parseStackTrace(error.stack);

    const mappedStack = await Promise.all(
      stack.map(async (frame) => {
        if (frame.file) {
          const source = await getSource(frame.file);
          const original = source.originalPositionFor({
            line: frame.lineNumber ?? 0,
            column: frame.column ?? 0,
          });

          return {
            arguments: frame.arguments,
            file: original.source.replace(/(\.\.\/)+/g, ''),
            lineNumber: original.line,
            column: original.column,
            methodName: original.name,
          } as StackFrame;
        }
        frame.file = frame.file?.replace(/(\.\.\/)+/g, '') ?? '';
        return frame;
      })
    );

    return mappedStack;
  }

  async function getSource(file: string) {
    if (sources.has(file)) {
      return sources.get(file)!;
    }

    const source = await fetch(file + '.map');
    const sourceMap = await source.json();
    const consumer = await new SourceMapConsumer(sourceMap);
    sources.set(file, consumer);

    return consumer;
  }
</script>

<script lang="ts">
  import { browser } from '$app/env';
import ThemeRoot from './ThemeRoot.svelte';

  export let variant: ErrorPageVariant = 'ERROR';
  export let error: Error | null = null;

  const colors = {
    ERROR: '#00a98a',
    NOT_IMPLEMENTED: '#ff4f4f',
    NOT_FOUND: '#c622a2',
    UNKNOWN: '#303030'
  };

  const accent = colors[variant];
</script>

<ThemeRoot {accent} background='#e1e1e1'>
<main>
  <section>
    <slot>
      <h1>{error?.name}</h1>
      <p>{error?.message}</p>
    </slot>

    {#if variant !== 'NOT_IMPLEMENTED' && error}
      {#if browser}
        {#await createMappedSource(error)}
          <p>generating stack trace...</p>
        {:then stackFrames}
          <div>
            <strong>{error.name}</strong>: {error.message}
          </div>
          {#if stackFrames}
            {#each stackFrames as frame}
              <div>
                {#if frame.file?.startsWith('build/runtime')}
                  {#if frame.methodName}
                    at {frame.methodName} (@sveltejs/kit)
                  {:else}
                    at @sveltejs/kit
                  {/if}
                {:else if frame.methodName}
                  at {frame.methodName} ({frame.file}:{frame.lineNumber}:{frame.column})
                {:else}
                  at {frame.file}:{frame.lineNumber}:{frame.column}
                {/if}
              </div>
            {/each}
          {:else}
            <p>no stack trace available</p>
          {/if}
        {/await}
      {:else}
        <strong>TODO: SSR stack trace source mapping</strong>
      {/if}
    {/if}

    <hr />
    <p class="now-what">now what?</p>
    <ul>
      <li><a href="/">home page</a></li>
      <li><a href="https://google.com">google</a></li>
      <li><a href="mailto:dave@davecode.net">tell me about it</a></li>
      {#if variant === 'NOT_FOUND'}
        <li><a href="https://reddit.com/r/all">browse memes</a></li>
        <!-- <li><a href="#game">play a game</a></li> -->
      {:else}
        <li>
          <a href="https://github.com/davecaruso/davecode.net/issues">browse github issues</a>
        </li>
      {/if}
    </ul>
  </section>
</main>
</ThemeRoot>
<style lang="scss">
  main {
    margin: 0 auto;

    :global {
      p,
      h1 {
        margin-bottom: 1rem;
      }

      h1 {
        text-shadow: shadow(3px, 1, hsl(var(--accent-dark-3)));
        color: hsl(var(--accent-base));
        line-height: 1.15em;
        @media (max-width: 519px) {
          font-size: 8.5vw;
        }
      }

      ul li {
        margin-left: 1.5em;

        &:before {
          content: '-';
          padding-right: 8px;
        }
      }

      pre {
        font-family: monospace;
        font-size: 0.9em;
        overflow-x: auto;
        width: 100%;
        max-width: calc(100vw - 2rem);
      }
    }
  }

  section {
    padding: 1rem;
    padding-top: 3rem;
    max-width: 38rem;
    margin: auto;
  }

  hr {
    height: 3rem;
    border: none;
  }

  p.now-what {
    font-weight: bold;
    margin-bottom: 0.25rem;
    color: rgba(0, 0, 0, 0.5);
  }
</style>

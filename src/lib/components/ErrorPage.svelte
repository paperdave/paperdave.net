<script context="module" lang="ts">
  import { SourceMapConsumer } from 'source-map-js';
  import { parse as parseStackTrace, StackFrame } from 'stacktrace-parser';

  // for later: the vscode uri handler works like
  // vscode://file/C:/Code/davecode.net/package.json

  export type ErrorPageVariant = 'ERROR' | 'NOT_IMPLEMENTED' | 'NOT_FOUND' | 'UNKNOWN';
  const sources = new Map<string, SourceMapConsumer>();

  /** Creates a mapped source object */
  async function createMappedSource(error: Error) {
    if (!error.stack) {
      return null;
    }

    const stack = parseStackTrace(error.stack);

    if (dev) {
      return stack
        .map((frame) => {
          if (frame.file) {
            frame.file = frame.file.replace(/.*davecode.net\//, '');
          }
          return frame;
        })
        .filter((frame) => {
          if (frame.file) {
            // if (frame.file.includes('node_modules')) return false;
            if (frame.file.startsWith('node:internal')) return false;
            if (frame.file.startsWith('.svelte-kit/')) return false;
          }
          return true;
        });
    }

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
  import { browser, dev } from '$app/env';
  import ThemeRoot from './ThemeRoot.svelte';

  export let variant: ErrorPageVariant = 'ERROR';
  export let error: Error | null = null;

  const colors = {
    ERROR: '#ff4f4f',
    NOT_FOUND: '#c622a2',
    NOT_IMPLEMENTED: '#00a98a',
    UNKNOWN: '#303030',
  };

  const accent = colors[variant];
</script>

<ThemeRoot {accent} background="#e1e1e1">
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
            <div class="error-header">
              <strong class="error-name">{error.name}</strong>:
              <span class="error-msg">{error.message}</span>
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
        color: hsl(var(--acc-base));
        line-height: 1.15em;
        text-shadow: shadow(3px, 1, hsl(var(--acc-dark-3)));
        @media (max-width: 519px) {
          font-size: 8.5vw;
        }
      }

      ul li {
        margin-left: 1.5em;

        &:before {
          padding-right: 8px;
          content: '-';
        }
      }

      pre {
        width: 100%;
        max-width: calc(100vw - 2rem);
        overflow-x: auto;
        font-size: 0.9em;
        font-family: monospace;
      }
    }
  }

  section {
    margin: auto;
    padding: 1rem;
    padding-top: 3rem;
    max-width: 50rem;
  }

  hr {
    border: none;
    height: 3rem;
  }

  p.now-what {
    margin-bottom: 0.25rem;
    color: rgba(0, 0, 0, 0.5);
    font-weight: bold;
  }

  .error-header {
    font-size: 1.2rem;
  }
  .error-msg {
    font-weight: 500;
  }
</style>

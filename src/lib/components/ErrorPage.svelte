<script context="module" lang="ts">
  import { SourceMapConsumer } from 'source-map-js';
  import { parse as parseStackTrace, StackFrame } from 'stacktrace-parser';

  export enum ErrorPageVariant {
    Error,
    NotImplemented,
    NotFound,
    Unknown,
  }

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

  export let variant: ErrorPageVariant = ErrorPageVariant.Unknown;
  export let error: Error | null = null;
</script>

<main
  class:notFound={variant === ErrorPageVariant.NotFound}
  class:error={variant === ErrorPageVariant.Error}
  class:notImpl={variant === ErrorPageVariant.NotImplemented}>
  <section>
    <slot>
      <h1>{error?.name}</h1>
      <p>{error?.message}</p>
    </slot>

    {#if variant !== ErrorPageVariant.NotImplemented && error}
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
      <li><a href="mailto:dave@davecode.me">tell me about it</a></li>
      {#if variant === ErrorPageVariant.NotFound}
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

<style lang="scss">
  main {
    background-color: #e1e1e1;
    color: black;
    font-size: 1rem;

    --color: #888888;
    --drop: #303030;

    :global {
      p,
      h1 {
        margin-bottom: 1rem;
      }

      h1 {
        text-shadow: shadow(3px, 1, var(--drop));
        color: var(--color);
        line-height: 1.15em;
        @media (max-width: 519px) {
          font-size: 8.5vw;
        }
      }

      a {
        color: var(--color);
        &:hover {
          text-decoration: underline;
        }
        &:active {
          color: #ff3a32;
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

  .notFound {
    --color: #00a98a;
    --drop: #005d40;
  }

  .error {
    --color: #ff4f4f;
    --drop: #c80518;
  }

  .notImpl {
    --color: #c622a2;
    --drop: #6d007a;
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

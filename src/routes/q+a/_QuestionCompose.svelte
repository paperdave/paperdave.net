<script lang="ts">
  import { fade } from 'svelte/transition';

  export let value: string = '';
  export let expanded: boolean = false;
  export let sending: boolean = false;
  export let sendingState: 'success' | 'failure' | null = null;

  let textarea: HTMLTextAreaElement | undefined;
  let wrapCalculator: HTMLDivElement | undefined;
  let expandedAnim = true;

  let height = 0;

  function focus() {
    if (!expanded) {
      setTimeout(() => {
        expandedAnim = false;
      }, 250);
    }
    expanded = true;
  }
</script>

<main>
  <h2 class:expanded>ask a question</h2>

  {#if sending}
    <div class="bar">
      <div class="anim" />
      {#if sendingState !== null}
        <div
          class="result"
          class:success={sendingState === 'success'}
          class:failure={sendingState === 'failure'}
          transition:fade={{ duration: 200 }} />
      {/if}
    </div>
  {/if}

  <textarea
    bind:this={textarea}
    bind:value
    id="question"
    placeholder="ask a question..."
    rows={1}
    class:expanded-anim={expandedAnim}
    class:expanded
    class:sending
    style="height:{sending ? '0' : expanded ? `${height}px` : '2.5rem'}"
    on:focus={focus}
    disabled={sending} />

  <!-- this is a funny trick for calculating the textarea height -->
  <div bind:this={wrapCalculator} class="wrap-calculator" bind:clientHeight={height}>
    {value}
    |
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    isolation: isolate;
  }

  textarea,
  .wrap-calculator {
    line-height: 1.25rem;
    font-size: 1rem;
    width: 100%;
    max-width: 30rem;
    padding: 0.5rem;
    background: black;
    color: rgba(255, 255, 255, 1);
    border: 1px solid white;
    resize: none;
    border-radius: 2px;
    overflow: hidden;
    font-family: Hack, monospace;
  }
  textarea {
    &::placeholder {
      transition: opacity 0.2s ease-in-out;
      color: #666;
      opacity: 1;
    }
    &:focus {
      outline: none;
      border: 1px solid #faa719;
    }
    &.expanded::placeholder {
      opacity: 0;
    }
  }

  textarea.expanded-anim {
    transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .wrap-calculator {
    position: absolute;
    visibility: hidden;
    white-space: pre-wrap;
    min-height: 6.25rem;
    word-break: break-all;
  }

  .sending {
    transition: height 500ms cubic-bezier(0.4, 0, 0.2, 1), color 100ms ease-in-out;

    height: 0.5rem;
    color: rgba(255, 255, 255, 0);
    pointer-events: none;
  }

  h2 {
    user-select: none;
    color: #bbb;
    z-index: -1;
    font-size: 1rem;
    font-weight: 300;
    position: absolute;
    transform: translate(0.5rem, 0);
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  h2.expanded {
    transform: translate(0.5rem, -1.75rem);
  }

  .bar {
    position: absolute;
    height: 1rem;
    width: 100%;
    max-width: 30rem;
    overflow: hidden;
    transform: translate(0, 1px);
  }

  .anim {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    animation: indeterminateAnimation 1s 400ms both infinite linear;
    transform-origin: 0% 50%;
  }

  .result {
    position: absolute;
    top: 0;
    left: 1px;
    width: calc(100% - 2px);
    height: 100%;
    animation: resultAnimation 1s ease-in-out both;
    &.success {
      background-color: #51d064;
    }
    &.failure {
      background-color: #df4f3d;
    }
  }

  @keyframes indeterminateAnimation {
    0% {
      transform: translateX(0) scaleX(0);
    }
    40% {
      transform: translateX(0) scaleX(0.4);
    }
    100% {
      transform: translateX(100%) scaleX(0.5);
    }
  }
</style>

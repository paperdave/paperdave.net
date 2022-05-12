<script lang="ts">
  import { page } from '$app/stores';

  import TextBox from '$lib/components/TextBox.svelte';

  import { fade } from 'svelte/transition';

  export let value: string = '';
  export let expanded: boolean = false;
  export let sending: boolean = false;
  export let sendingState: 'success' | 'failure' | null = null;

  import { data as ideas } from './random-question-ideas.json';
  let placeholder = ideas[Math.floor(Math.random() * ideas.length)];

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

  function handleBlur() {
    setTimeout(() => {
      placeholder = ideas[Math.floor(Math.random() * ideas.length)];
    }, 110);
  }
</script>

<div class="root">
  <h2 class:expanded>ask a question</h2>

  {#if sending}
    <div class="bar">
      <div class="anim" />
      {#if sendingState !== null}
        <div
          class="result"
          class:success={sendingState === 'success'}
          class:failure={sendingState === 'failure'}
          transition:fade|local={{ duration: 200 }} />
      {/if}
    </div>
  {/if}

  {#if $page.url.searchParams.get('beta') === 'modern_question_ask'}
    <TextBox name="q" label="ask a question" {placeholder} on:blur={handleBlur} />
  {:else}
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
  {/if}

  <!-- this is a funny trick for calculating the textarea height -->
  <div bind:this={wrapCalculator} class="wrap-calculator" bind:clientHeight={height}>
    {value}
    |
  </div>
</div>

<style lang="scss">
  .root {
    display: flex;
    isolation: isolate;
  }

  textarea,
  .wrap-calculator {
    --mono: 1;
    border: 1px solid white;
    border-radius: 2px;
    background: black;
    padding: 0.5rem;
    width: 100%;
    max-width: 30rem;
    overflow: hidden;
    resize: none;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    line-height: 1.25rem;
  }
  textarea {
    &::placeholder {
      opacity: 1;
      transition: opacity 0.2s ease-in-out;
      color: #666;
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
    min-height: 6.25rem;
    white-space: pre-wrap;
    word-break: break-all;
  }

  .sending {
    transition: height 500ms cubic-bezier(0.4, 0, 0.2, 1), color 100ms ease-in-out;

    height: 0.5rem;
    pointer-events: none;
    color: rgba(255, 255, 255, 0);
  }

  h2 {
    position: absolute;
    transform: translate(0.5rem, 0);
    z-index: -1;
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
    color: #bbb;
    font-weight: 300;
    font-size: 1rem;
    user-select: none;
  }
  h2.expanded {
    transform: translate(0.5rem, -1.75rem);
  }

  .bar {
    position: absolute;
    transform: translate(0, 1px);
    width: 100%;
    max-width: 30rem;
    height: 1rem;
    overflow: hidden;
  }

  .anim {
    transform-origin: 0% 50%;
    animation: indeterminateAnimation 1s 400ms both infinite linear;
    background-color: rgba(255, 255, 255, 0.7);
    width: 100%;
    height: 100%;
  }

  .result {
    position: absolute;
    top: 0;
    left: 1px;
    animation: resultAnimation 1s ease-in-out both;
    width: calc(100% - 2px);
    height: 100%;
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

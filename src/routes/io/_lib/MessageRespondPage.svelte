<script lang="ts">
  import AccentOverride from '$lib/components/AccentOverride.svelte';
  import Button from '$lib/components/Button.svelte';
  import ButtonRow from '$lib/components/ButtonRow.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import { palette } from '$lib/theme';
  import { formatDate } from '$lib/utils/date';
  import type { Message, MessageInput } from '@prisma/client';
  import { createEventDispatcher } from 'svelte';
  import MessageRender from './MessageRender.svelte';

  const dispatch = createEventDispatcher();

  let loading = false;

  export let message: Message;
  export let input: MessageInput | null = null;
  export let inboxLength = 0;

  let copied = structuredClone(message);
  let text = copied.text;
  $: updateText(text);

  function updateText(text: string) {
    copied.text = text;
  }

  async function apply() {
    loading = true;
    fetch('/io/api/insert', {
      method: 'POST',
      body: JSON.stringify(copied),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => dispatch('done'))
      .finally(() => (loading = false));
  }

  function del() {
    loading = true;
    (input
      ? fetch('/io/api/insert', {
          method: 'POST',
          body: JSON.stringify({
            date: message.date,
            type: 'REJECT',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      : fetch('/io/api/delete', {
          method: 'POST',
          body: JSON.stringify({ date: message.date }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
    )
      .then(() => {
        dispatch('done');
        dispatch('deleted');
      })
      .finally(() => (loading = false));
  }

  function defer() {
    dispatch('defer');
  }

  function reset() {
    copied = structuredClone(message);
    text = copied.text;
  }
</script>

<flex gap inert={loading ? 'true' : null} class:loading>
  <h1>io message management dashboard</h1>
  {#if !input}
    <p>
      editing message from {formatDate(message.date, 'date-time')}
    </p>
  {:else}
    you have {inboxLength} question{inboxLength === 1 ? '' : 's'} in your inbox
  {/if}

  <p>btw if youre not logged in, you wont be able to actually submit changes.</p>

  <flex row gap class="equal-width">
    <flex column gap>
      <ButtonRow>
        <AccentOverride accent={palette.green[500]}>
          <Button variant="accent" on:click={apply}>apply</Button>
        </AccentOverride>
        <AccentOverride accent={palette.red[500]}>
          <Button variant="accent" on:click={del}>delete</Button>
        </AccentOverride>
        {#if input}
          <Button variant="normal" on:click={defer}>defer</Button>
        {/if}
        <Button variant="normal" on:click={reset}>reset</Button>
      </ButtonRow>
      {#if input}
        <pre><code>{input.prompt}</code></pre>
      {/if}

      <div>
        <TextBox unstable_ioTextarea label="response" bind:value={text} />
      </div>
    </flex>
    <flex column style="flex:0 0 800px">
      <MessageRender message={copied} />
    </flex>
  </flex>
</flex>

<style lang="scss">
  .equal-width {
    width: 100%;
    & > * {
      flex: 0 1 100%;
    }
  }

  .loading {
    opacity: 0.5;
    pointer-events: none;
  }

  pre {
    background-color: black;
    color: hsl(var(--acc));
    padding: 1.5rem;
    white-space: pre-wrap;
  }
</style>

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
  import MessageRespondUploadUtil from './MessageRespondUploadUtil.svelte';

  const dispatch = createEventDispatcher();

  let loading = false;

  export let message: Message;
  export let input: MessageInput | null = null;
  export let inboxLength = 0;
  export let isSandbox = false;

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
            text: '',
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

  function insertFile() {
    document.querySelector('#stupid_hardcoded_url').click();
  }
</script>

<flex gap inert={loading ? 'true' : null} class:loading>
  <h1>io message management dashboard</h1>
  {#if isSandbox}
    <p>you are using the sandbox. this shows how the formatter works.</p>
  {:else if !input}
    <p>
      editing message from {formatDate(message.date, 'date-time')}
    </p>
  {:else}
    you have {inboxLength} question{inboxLength === 1 ? '' : 's'} in your inbox
  {/if}

  <flex row gap class="equal-width">
    <flex column gap>
      <ButtonRow>
        {#if !isSandbox}
          <AccentOverride accent={palette.green[500]}>
            <Button variant="accent" on:click={apply}>apply</Button>
          </AccentOverride>
          <AccentOverride accent={palette.red[500]}>
            <Button variant="accent" on:click={del}>delete</Button>
          </AccentOverride>
        {/if}
        {#if input}
          <Button variant="normal" on:click={defer}>defer</Button>
        {/if}
        <AccentOverride accent={palette.cyan[500]}>
          <Button variant="accent" on:click={insertFile}>insert file</Button>
        </AccentOverride>
        <Button variant="normal" on:click={reset}>reset</Button>
      </ButtonRow>
      {#if input}
        {#if input.sourceName}
          <p>
            from {input.sourceName} from {input.sourceLocation ?? 'unknown'}
          </p>
        {/if}
        <pre><code>{input.prompt}</code></pre>
      {/if}

      <MessageRespondUploadUtil />

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

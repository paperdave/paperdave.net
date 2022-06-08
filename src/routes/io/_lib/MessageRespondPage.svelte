<script lang="ts">
  import AccentOverride from '$lib/components/AccentOverride.svelte';
  import Button from '$lib/components/Button.svelte';
  import ButtonRow from '$lib/components/ButtonRow.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import { api } from '$lib/session';
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
    api
      .post('/io/api/insert', {
        json: copied,
      })
      .then(() => dispatch('done'))
      .finally(() => (loading = false));
  }

  function del() {
    loading = true;
    (input
      ? api.post('/io/api/insert', {
          json: {
            date: message.date,
            type: 'REJECT',
            text: '',
          },
        })
      : api.post('/io/api/delete', {
          json: {
            date: message.date,
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
    <p>
      you have {inboxLength} question{inboxLength === 1 ? '' : 's'} in your inbox
    </p>
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
        {#if input.sourceVPN}
          <p>
            using a vpn. type={input.sourceVPN}
          </p>
        {/if}
        {#if input.notifyEmail}
          <p>
            notify {input.notifyEmail}
          </p>
        {/if}
        <pre class="prompt"><code>{input.prompt}</code></pre>
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

  .prompt {
    background-color: black;
    color: hsl(var(--acc));
    padding: 1.5rem;
    white-space: pre-wrap;
  }
  .output {
    white-space: pre;
    width: 800px;
    color: white;
    overflow-x: scroll;
  }
</style>

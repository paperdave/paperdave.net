<script lang="ts">
  import type { Message, MessageInput } from '@prisma/client';
  import { formatDate } from 'src/date';
  import { Button } from 'src/lib';
  import { createEventDispatcher } from 'svelte';
  import MessageRender from './MessageRender.svelte';
  import MessageRespondUploadUtil from './MessageRespondUploadUtil.svelte';
  import { old_api_do_not_use_outside_qa as api } from './old_session';
  import QaTextBoxFork from './QATextBoxFork.svelte';

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
      .post('/q+a/api/insert', {
        json: copied
      })
      .then(() => dispatch('done'))
      .finally(() => (loading = false));
  }

  function del() {
    loading = true;
    (input
      ? api.post('/q+a/api/insert', {
          json: {
            date: message.date,
            type: 'REJECT',
            text: ''
          }
        })
      : api.post('/q+a/api/delete', {
          json: {
            date: message.date
          }
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

  // function insertFile() {
  //   document.querySelector<HTMLElement>('#stupid_hardcoded_url')!.click();
  // }
</script>

<layout-flex gap inert={loading ? 'true' : null} class:loading>
  <h1>questions answer machine 2023</h1>
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

  <layout-flex row gap class="equal-width">
    <layout-flex column gap>
      <layout-button-row>
        {#if !isSandbox}
          <Button variant="primary" on:click={apply}>apply</Button>
          <Button variant="secondary" on:click={del}>delete</Button>
        {/if}
        {#if input}
          <Button variant="normal" on:click={defer}>defer</Button>
        {/if}
        <!-- <Button variant="tertiary" on:click={insertFile}>insert file</Button> -->
        <Button variant="normal" on:click={reset}>reset</Button>
      </layout-button-row>
      {#if input}
        {#if input.sourceName}
          <p>
            from {input.sourceName} from {input.sourceLocation ?? 'unknown'}
          </p>
        {/if}
        {#if input.sourceVPN}
          <p>
            using a vpn. type={JSON.stringify(input.sourceVPN)}
          </p>
        {/if}
        {#if input.notifyEmail}
          <p>
            notify {JSON.stringify(input.notifyEmail)}
          </p>
        {/if}
        <pre class="prompt"><code>{input.prompt}</code></pre>
      {/if}

      <MessageRespondUploadUtil />

      <div>
        <QaTextBoxFork unstable_ioTextarea label="response" bind:value={text} />
      </div>
    </layout-flex>
    <flex column style="flex:0 0 800px">
      <MessageRender message={copied} />
    </flex>
  </layout-flex>
</layout-flex>

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
    color: rgb(var(--pri));
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

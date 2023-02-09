<script lang="ts">
  import type { Question, QuestionInput } from '@prisma/client';
  import MonacoEditor from 'src/components/MonacoEditor.svelte';
  import { formatDate } from 'src/date';
  import Button from 'src/lib/input-button/Button.svelte';
  import { createEventDispatcher } from 'svelte';
  import QuestionRender from './QuestionRender.svelte';
  import { old_api_do_not_use_outside_qa as api } from './old_session';

  const dispatch = createEventDispatcher();

  let loading = false;

  export let question: Question;
  export let input: QuestionInput | null = null;
  export let inboxLength = 0;
  export let isSandbox = false;
  export let legacy = false;

  let copied = structuredClone(question);
  let text = copied.text;
  $: updateText(text);

  function updateText(text: string) {
    copied.text = text;
  }

  async function apply() {
    loading = true;
    api
      .post('/q+a/api/insert', {
        json: copied,
        headers: input?.notifyEmail
          ? {
              'x-notify-email': input.notifyEmail
            }
          : undefined
      })
      .then(() => dispatch('done'))
      .finally(() => (loading = false));

    if (legacy) {
      api.post('/q+a/api/legacy-delete', {
        json: {
          date: question.date
        }
      });
    }
  }

  function del() {
    loading = true;
    (input
      ? legacy
        ? api.post('/q+a/api/legacy-delete', {
            json: {
              date: question.date
            }
          })
        : api.post('/q+a/api/insert', {
            json: {
              date: question.date,
              type: 'Reject',
              text: ''
            },
            headers: input.notifyEmail
              ? {
                  'x-notify-email': input.notifyEmail
                }
              : undefined
          })
      : api.post('/q+a/api/delete', {
          json: {
            date: question.date
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
    copied = structuredClone(question);
    text = copied.text;
  }

  // function insertFile() {
  //   document.querySelector<HTMLElement>('#stupid_hardcoded_url')!.click();
  // }
</script>

<layout-flex gap class:loading style="height:100vh">
  <h1>
    {#if legacy}
      re-enter old questions
    {:else if input}
      respond to questions
    {:else}
      question editor
    {/if}
  </h1>
  {#if !input}
    <p>
      editing message from {formatDate(question.date, 'date-time')}
    </p>
  {:else}
    <p>
      you have {inboxLength} question{inboxLength === 1 ? '' : 's'} in your inbox
    </p>
  {/if}

  <layout-flex row gap class="equal-width" style="flex:1;">
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
        {#if input}
          <layout-flex row>
            {#if input.sourceName}
              <p>
                from {input.sourceName} from {input.sourceLocation ?? 'unknown'}
              </p>
            {/if}
            {#if input.sourceVPN}
              <p>
                proxy/vpn{#if input.sourceVPN !== 'unknown'}
                  type={JSON.stringify(input.sourceVPN)}{/if}
              </p>
            {/if}
            {#if input.notifyEmail}
              <p>
                notify {JSON.stringify(input.notifyEmail)}
              </p>
            {/if}
          </layout-flex>
        {/if}
      </layout-button-row>

      <!-- <pre class="prompt"><code>{input.prompt}</code></pre> -->

      <div style="background-color: black;position:relative;flex:1">
        <MonacoEditor
          bind:value={text}
          options={{
            language: 'qa',
            theme: 'qa',
            fontSize: 22,
            scrollBeyondLastLine: false,
            wordWrap: 'on'
          }}
        />
      </div>
    </layout-flex>
    <flex column style="flex:0 0 800px">
      <QuestionRender question={copied} />
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

  h1,
  p {
    margin-bottom: 0;
    margin-top: 0.5rem;
  }
</style>

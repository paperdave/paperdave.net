<script lang="ts">
  import { Button } from '$lib';
  import IconButton from '../../../components/IconButton.svelte';
  import { fade } from 'svelte/transition';
  import placeholderData from './placeholders.txt?raw';
  import QaTextBoxFork from './QATextBoxFork.svelte';
  import { qaNotifyEmail } from './stores';
  import Link from 'src/lib/link/Link.svelte';

  const placeholders = placeholderData.split('\n').filter(Boolean);

  let form: HTMLFormElement;

  export let focused = false;
  export let expanded = false;
  export let content = '';
  export let loading = false;
  export let result: { url: string; error?: true; message?: string } | null = null;

  const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/;

  let emailTextBox: QaTextBoxFork;

  $: expanded = focused || content.length > 0;

  let emailTextBoxHasFocus = false;
  let placeholder: string;
  function regeneratePlaceholder() {
    placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];
  }

  let notifFormOpened = !!$qaNotifyEmail;
  function openNotifForm() {
    notifFormOpened = true;
    emailTextBox.focus();
  }

  function unfocusNotifForm() {
    $qaNotifyEmail = $qaNotifyEmail.trim();

    if (!$qaNotifyEmail) {
      notifFormOpened = false;
    }
  }

  function handleSubmit(ev: SubmitEvent) {
    const data = new FormData(form);
    loading = true;
    result = null;
    fetch('/q+a/api/submit', {
      method: 'POST',
      body: data
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((json) => {
            result = json;
            loading = false;
          });
        } else {
          return res.json().then((json) => {
            result = { error: true, message: json.message ?? 'Unknown error.', url: json.url };
            loading = false;
          });
        }
      })
      .catch((err) => {
        result = { error: true, message: 'Network error.', url: '' };
        loading = false;
      });
  }

  regeneratePlaceholder();
</script>

{#if !result}
  <form bind:this={form} method="post" on:submit|preventDefault={handleSubmit}>
    <div>
      <QaTextBoxFork
        disabled={loading}
        maxlength={10000}
        name="content"
        label="ask a question"
        bind:value={content}
        {placeholder}
        on:focus={regeneratePlaceholder}
        unstable_ioTextarea
      />
    </div>

    <div>
      <div class="controls" class:expanded aria-hidden={expanded ? 'false' : 'true'}>
        <layout-button-row align="right">
          <div class="notification-button-expand" class:expanded={notifFormOpened}>
            <div class="button">
              <IconButton
                on:click={openNotifForm}
                name="notifications"
                disabled={loading}
                tabindex={notifFormOpened || !expanded ? '-1' : undefined}
              />
            </div>
            <div class="textbox">
              <QaTextBoxFork
                autoHeight
                disabled={loading}
                type="email"
                name="email"
                maxlength={128}
                id="paperdave-io-notify-email"
                bind:focused={emailTextBoxHasFocus}
                bind:this={emailTextBox}
                on:blur={unfocusNotifForm}
                bind:value={$qaNotifyEmail}
                error={!emailTextBoxHasFocus &&
                  $qaNotifyEmail !== '' &&
                  !EMAIL_REGEX.test($qaNotifyEmail)}
                tabindex={notifFormOpened ? undefined : '-1'}
                placeholder="email@domain.net"
              />
            </div>
            <label class="text" for="paperdave-io-notify-email">notify at:</label>
          </div>

          <Button tabindex={expanded ? undefined : '-1'} type="submit" disabled={loading}>
            Send
          </Button>
        </layout-button-row>
      </div>
    </div>
  </form>
{:else}
  <div in:fade={{ duration: 100 }}>
    {#if result.error}
      <h2 class="error">error sending question</h2>
      <p>
        {result.message}
      </p>
      <layout-button-row>
        <Button
          on:click={() => {
            result = null;
          }}
        >
          try again
        </Button>
      </layout-button-row>
      <br />
    {:else}
      <div class="success">
        <p>
          <strong>question sent:</strong>
          when it is responded to it will appear at:<br />
          <Link href={result.url}>{result.url}</Link>.
        </p>
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    &.error {
      color: #ff3a32;
    }
  }

  .controls {
    opacity: 0;
    width: 100%;
    transition: opacity 0.2s ease-in-out;
  }

  .controls.expanded {
    opacity: 1;
    display: block;
  }

  .notification-button-expand {
    display: flex;

    position: relative;
    height: 2.25rem;
    width: 2.25rem;

    transition: width 200ms $ease;

    & > div > :global(*) {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    .textbox > :global(*) {
      transition: opacity 100ms linear;
      pointer-events: none;
      opacity: 0;
    }

    .text {
      position: absolute;
      right: calc(100% + 1rem);
      white-space: nowrap;
      height: 2.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 100ms linear;
    }

    &.expanded {
      width: 200px;

      .textbox > :global(*) {
        pointer-events: all;
        opacity: 1;
      }

      .text {
        opacity: 1;
      }

      .button {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
</style>

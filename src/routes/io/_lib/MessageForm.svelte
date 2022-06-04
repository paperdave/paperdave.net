<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import ButtonRow from '$lib/components/ButtonRow.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import { fade } from 'svelte/transition';
  import { data as placeholders } from './placeholders.json';
  import { ioNotifyEmail } from './stores';

  let form: HTMLFormElement;

  export let focused = false;
  export let expanded = false;
  export let content = '';
  export let loading = false;
  export let result: { url?: string; error?: true; message?: string } | null = null;

  const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/;

  let emailTextBox: TextBox;

  $: expanded = focused || content.length > 0;

  let emailTextBoxHasFocus = false;
  let placeholder: string;
  function regeneratePlaceholder() {
    placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];
  }

  let notifFormOpened = !!$ioNotifyEmail;
  function openNotifForm() {
    notifFormOpened = true;
    emailTextBox.focus();
  }

  function unfocusNotifForm() {
    $ioNotifyEmail = $ioNotifyEmail.trim();

    if (!$ioNotifyEmail) {
      notifFormOpened = false;
    }
  }

  function handleSubmit(ev: SubmitEvent) {
    const data = new FormData(form);
    loading = true;
    result = null;
    fetch('/io/api/submit', {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((json) => {
            result = json;
            loading = false;
          });
        } else {
          return res.json().then((json) => {
            result = { error: true, message: json.message ?? 'Unknown error.' };
            loading = false;
          });
        }
      })
      .catch((err) => {
        result = { error: true, message: 'Network error.' };
        loading = false;
      });
  }

  regeneratePlaceholder();
</script>

{#if !result}
  <form bind:this={form} method="post" on:submit|preventDefault={handleSubmit}>
    <div>
      <TextBox
        disabled={loading}
        maxlength={10000}
        name="content"
        label="write something"
        bind:value={content}
        {placeholder}
        on:focus={regeneratePlaceholder}
        unstable_ioTextarea />
    </div>

    <div>
      <div class="controls" class:expanded aria-hidden={expanded ? 'false' : 'true'}>
        <ButtonRow align="right">
          <div class="notification-button-expand" class:expanded={notifFormOpened}>
            <div class="button">
              <IconButton
                on:click={openNotifForm}
                name="notifications"
                disabled={loading}
                tabindex={notifFormOpened || !expanded ? '-1' : undefined} />
            </div>
            <div class="textbox">
              <TextBox
                autoHeight
                disabled={loading}
                type="email"
                name="email"
                maxlength={128}
                id="davecode-io-notify-email"
                bind:focused={emailTextBoxHasFocus}
                bind:this={emailTextBox}
                on:blur={unfocusNotifForm}
                bind:value={$ioNotifyEmail}
                error={!emailTextBoxHasFocus &&
                  $ioNotifyEmail !== '' &&
                  !EMAIL_REGEX.test($ioNotifyEmail)}
                tabindex={notifFormOpened ? undefined : '-1'}
                placeholder="email@domain.net" />
            </div>
            <label class="text" for="davecode-io-notify-email">notify at:</label>
          </div>

          <Button tabindex={expanded ? undefined : '-1'} type="submit" disabled={loading}>
            Send
          </Button>
        </ButtonRow>
      </div>
    </div>
  </form>
{:else}
  <div in:fade={{ duration: 100 }}>
    {#if result.error}
      <h2 class="error">error sending message</h2>
      <p>
        {result.message}
      </p>
      <br />
      <br />
      <ButtonRow>
        <Button
          on:click={() => {
            result = null;
          }}>
          try again
        </Button>
      </ButtonRow>
    {:else}
      <div class="success">
        <p>
          <strong>message sent:</strong>
          when it is responded to it will appear at <a href={result.url}>{result.url}</a>.
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

    transition: width 200ms $easing;

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
    }
  }
</style>

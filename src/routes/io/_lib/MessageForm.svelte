<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import ButtonRow from '$lib/components/ButtonRow.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import { data as placeholders } from './random-question-ideas.json';
  import { ioNotifyEmail } from './stores';

  export let focused = false;
  export let expanded = false;
  export let content = '';

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

  regeneratePlaceholder();
</script>

<form method="post">
  <div>
    <TextBox
      name="content"
      label="write something"
      bind:value={content}
      {placeholder}
      on:focus={regeneratePlaceholder}
      unstable_ioTextarea />
  </div>

  <div>
    <div class="controls" class:expanded>
      <ButtonRow align="right">
        <div class="notification-button-expand" class:expanded={notifFormOpened}>
          <div class="button">
            <IconButton
              on:click={openNotifForm}
              name="notifications"
              tabindex={notifFormOpened ? '-1' : undefined} />
          </div>
          <div class="textbox">
            <TextBox
              type="email"
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

        <Button type="submit">Send</Button>
      </ButtonRow>
    </div>
  </div>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
  }

  .controls {
    opacity: 0;
    display: none;
    width: 100%;
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

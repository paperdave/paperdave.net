<script lang="ts">
  import QaInput from './_QAInput.svelte';
  import InfoSVG from '$lib/svg/Info.svg?component';
  import AlertSVG from '$lib/svg/Alert.svg?component';
  import QuestionCompose from './_QuestionCompose.svelte';
  import { QuestionRequest } from '$lib/structures';
  import { fade } from 'svelte/transition';

  let sending = false;
  let questionText = '';
  export let expanded = false;

  async function submit(ev: Event) {
    ev.preventDefault();
    sending = true;

    const request = new QuestionRequest().setContent(questionText);

    const response = await fetch('/q+a/submit-question', {
      method: 'POST',
      body: JSON.stringify(request.toJSON()),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }
</script>

<form on:submit={submit}>
  <div class="container">
    <QuestionCompose bind:value={questionText} bind:expanded {sending} />
  </div>
  {#if expanded && !sending}
    <div class="buttons" transition:fade={{ duration: 200 }}>
      <!-- <QaInput type="button" disabled><InfoSVG /></QaInput> -->
      <QaInput type="button" disabled><AlertSVG /></QaInput>
      <p style="line-height:2.5rem;opacity:0.4">(email/push notification coming soon)</p>
      <div class="grow" />
      <QaInput type="submit" disabled={questionText.trim().length === 0}>SEND</QaInput>
    </div>
  {/if}
</form>

<style lang="scss">
  .grow {
    flex: 1;
  }
  .buttons {
    width: 100%;
    max-width: 30rem;
    position: absolute;
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  form :global(button) {
    font-family: Hack, monospace;
    height: 2.6rem;

    & :global(svg) {
      height: 1.5rem;
      width: 1.5rem;
    }
  }
</style>

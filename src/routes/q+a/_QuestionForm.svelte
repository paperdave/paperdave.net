<script lang="ts">
  import QaInput from './_QAInput.svelte';
  import InfoSVG from '$lib/svg/Info.svg?component';
  import AlertSVG from '$lib/svg/Alert.svg?component';
  import QuestionCompose from './_QuestionCompose.svelte';
  import { Question, QuestionRequest } from '$lib/structures';
  import { fade } from 'svelte/transition';

  let sending = false;
  let questionText = '';
  export let expanded = false;

  let sentQuestionId: string | null = null;
  let sentFailed = false;

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

    if (response.success) {
      sentQuestionId = response.dateId;
    } else {
      sentFailed = true;
    }
  }
</script>

<form on:submit={submit}>
  <div class="container">
    <QuestionCompose
      bind:value={questionText}
      bind:expanded
      {sending}
      sendingState={sentQuestionId ? 'success' : sentFailed ? 'failure' : null} />
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
  {#if sentQuestionId}
    <div class="sent" transition:fade={{ duration: 200 }}>
      <h2>your question was sent!</h2>
      <p>when it is answered it will be viewable <a href="/q+a/{sentQuestionId}">here</a>.</p>
      <p>(check back in a day or two)</p>
    </div>
  {/if}
  {#if sentFailed}
    <div class="sent" transition:fade={{ duration: 200 }}>
      <h2>your question was not sent!</h2>
      <p>please try again later.</p>
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

  .sent {
    position: absolute;
    z-index: 100;

    h2 {
      font-size: 1.2rem;
      font-weight: normal;
      margin: 0;
      margin-top: 0.5rem;
    }
    p {
      font-size: 0.8rem;
      font-weight: normal;
      margin: 0;
      margin-top: 0.5rem;
    }
  }
</style>

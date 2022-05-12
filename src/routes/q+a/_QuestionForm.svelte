<script lang="ts">
  import QaInput from './_QAInput.svelte';
  import QuestionCompose from './_QuestionCompose.svelte';
  import { QuestionRequest } from '$lib/structures';
  import { fade } from 'svelte/transition';
  import { API } from '$lib/api-client/singleton';

  let sending = false;
  let questionText = '';
  export let expanded = false;

  let sentQuestionId: string | null = null;
  let sentFailed = false;

  async function submit(ev: Event) {
    ev.preventDefault();
    sending = true;

    const request = new QuestionRequest({
      content: questionText,
    });

    const response = await API.questions.createRequest(request);
    if (response) {
      sentQuestionId = `${location.origin}/q+a/${response.getDateId()}`;
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
    <div class="buttons" transition:fade|local={{ duration: 200 }}>
      <QaInput type="submit" disabled={questionText.trim().length === 0}>SEND</QaInput>
    </div>
  {/if}
  {#if sentQuestionId}
    <div class="sent" transition:fade|local={{ duration: 200 }}>
      <h2>your question was sent!</h2>
      <p>
        it's permalink is at <a href={sentQuestionId}>{sentQuestionId}</a>
      </p>
      <p>(check back in a day or two, or five)</p>
    </div>
  {/if}
  {#if sentFailed}
    <div class="sent" transition:fade|local={{ duration: 200 }}>
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
    display: flex;
    position: absolute;
    gap: 0.5rem;
    margin-top: 0.5rem;
    width: 100%;
    max-width: 30rem;
  }

  form :global(button) {
    --mono: 1;
    height: 2.6rem;

    & :global(svg) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .sent {
    position: absolute;
    z-index: 100;

    h2 {
      margin: 0;
      margin-top: 0.5rem;
      font-weight: normal;
      font-size: 1.2rem;
    }
    p {
      margin: 0;
      margin-top: 0.25rem;
      font-weight: normal;
      font-size: 0.8rem;
    }
  }
</style>

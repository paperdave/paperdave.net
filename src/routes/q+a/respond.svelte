<script context="module" lang="ts">
  import type { JSONData, Question } from '$lib/structures';
  import { QuestionRequest, Permission } from '$lib/structures';
  import { restrictedPage } from '$lib/utils/client';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = restrictedPage([Permission.RESPOND_TO_QUESTIONS], async ({}) => {
    if (!browser)
      return {
        props: {},
      };
    return {
      props: {
        questions: await fetch('/q+a/get-requests', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
          .then((x) => x.json())
          .then((x) => x.map((y: JSONData<QuestionRequest>) => QuestionRequest.fromJSON(y))),
      },
    };
  });
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import QaHeader from './_QAHeader.svelte';
  import QuestionRespondApp from './_QuestionRespondApp.svelte';
  import { getToken } from '$lib/api-client/session';

  export let questions: QuestionRequest[] = [];

  $: latestQuestion = questions[0];

  function sendQuestion(q: Question, request: QuestionRequest) {
    fetch('/q+a/submit-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        date: request.date.getTime(),
        result: q.toJSON(),
      }),
    });

    questions = questions.slice(1);
  }

  function denyQuestion(q: Question, request: QuestionRequest) {
    fetch('/q+a/submit-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        date: request.date.getTime(),
        result: null,
      }),
    });
    questions = questions.slice(1);
  }
</script>

{#if browser}
  <main>
    <div style="pointer-events:none">
      <QaHeader />
    </div>
    <div class="stats">
      <p>#q: {questions.length}</p>
    </div>
    {#if latestQuestion}
      {#key latestQuestion.date.getTime()}
        <QuestionRespondApp
          request={latestQuestion}
          on:send={(ev) => sendQuestion(ev.detail, latestQuestion)}
          on:deny={(ev) => denyQuestion(ev.detail, latestQuestion)} />
      {/key}
    {:else}
      <p>caught up :D</p>
    {/if}
  </main>
{/if}

<style lang="scss">
  .stats {
    position: absolute;
    top: 20px;
    left: 500px;
  }
</style>

<script context="module" lang="ts">
  import type { JSONData, Question } from '$lib/structures';
  import { QuestionRequest, UserPermission } from '$lib/structures';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ session, page, fetch }) => {
    if (page.query.get('demo')) {
      return {
        props: {
          isDemo: true,
          isAuthorized: true,
          questions: [new QuestionRequest().setContent('hello demo').setDate(new Date())],
        },
      };
    }

    if (!session.user) {
      return {
        status: 302,
        redirect: '/auth?r=' + encodeURIComponent(page.path),
      };
    }

    return {
      props: {
        isAuthorized: session.user.permissions.includes(UserPermission.RESPOND_TO_QUESTIONS),
        isDemo: false,
        questions: session.user.permissions.includes(UserPermission.RESPOND_TO_QUESTIONS)
          ? await fetch('/q+a/get-requests')
              .then((x) => x.json())
              .then((x) => x.map((y: JSONData<QuestionRequest>) => QuestionRequest.fromJSON(y)))
          : [],
      },
    };
  };
</script>

<script lang="ts">
  import QaHeader from './_QAHeader.svelte';
  import QuestionRespondApp from './_QuestionRespondApp.svelte';

  export let isAuthorized: boolean;
  export let isDemo: boolean;
  export let questions: QuestionRequest[];

  $: latestQuestion = questions[0];

  function sendQuestion(q: Question) {
    if (!isDemo) {
      fetch('/q+a/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: q.date.getTime(),
          result: q.toJSON(),
        }),
      });
    } else {
      alert('submission content: ' + q.toJSON());
    }

    questions = questions.slice(1);
  }

  function denyQuestion(q: Question) {
    if (!isDemo) {
      fetch('/q+a/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: q.date.getTime(),
          result: null,
        }),
      });
    }
    questions = questions.slice(1);
  }
</script>

<main>
  <div style="pointer-events:none">
    <QaHeader />
  </div>
  {#if isAuthorized}
    <div class="stats">
      {#if isDemo}
        <p>THIS IS THE DEMO VERSION OF THE Q&A BACKEND. YOUR SUBMISSIONS DO GET SENT ANYWHERE.</p>
      {/if}
      <p>#q: {questions.length}</p>
    </div>
    {#if latestQuestion}
      {#key latestQuestion.date.getTime()}
        <QuestionRespondApp
          request={latestQuestion}
          on:send={(ev) => sendQuestion(ev.detail)}
          on:deny={(ev) => denyQuestion(ev.detail)} />
      {/key}
    {:else}
      <p>caught up :D</p>
    {/if}
  {:else}
    <p>You do not have permission to respond to questions.</p>
  {/if}
</main>

<style lang="scss">
  .stats {
    position: absolute;
    top: 20px;
    left: 500px;
  }
</style>

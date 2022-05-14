<script context="module" lang="ts">
  import { Question } from '$lib/structures';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, params }) => {
    const qid = params.id;

    if (!qid.match(/^[0-9]{12}$/)) return {};

    const API = wrapAPI(fetch);

    return {
      props: {
        question: await API.questions.getQuestion(qid).catch(() => null),
      },
    };
  };
</script>

<script lang="ts">
  import QuestionRender from './_QuestionRender.svelte';
  import { wrapAPI } from '$lib/api-client/singleton';
  import Meta from '$lib/components/Meta.svelte';
  import { formatDate } from '$lib/utils/date';

  export let question: Question;
</script>

{#if question && question.isAccepted()}
  <Meta
    title="question permalink: {formatDate(question.date, 'date-time')}"
    description={question.content.find((x) => x.who === 'QUESTION')?.message ?? 'unknown question'}
    noIndex />
{:else}
  <Meta title="question not found" noIndex />
{/if}

{#key question.date.getTime()}
  {#if question}
    {#if question.isPending()}
      <section>
        <p>this question is awaiting an answer from dave, please be patient:</p>
      </section>
      <pre>{question.content[0].message}</pre>
    {:else if question.isRejected()}
      <section>
        <p>ouch...</p>
      </section>
      <section>
        <QuestionRender {question} />
      </section>
      <section>
        <p>tip for the future: do not ask that, i guess.</p>
      </section>
    {:else}
      <section>
        <p>this page is a permalink for the following question:</p>
      </section>
      <section>
        <QuestionRender {question} />
      </section>
    {/if}
  {:else}
    <section>
      <p>
        yikes! <br />
        question permalink was not found. did you type it in manually?
      </p>
      <p>
        <a href="/q+a">view questions that do exist</a>
      </p>
    </section>
  {/if}
{/key}

<style lang="scss">
  section {
    margin-bottom: 3rem;
  }
  p {
    margin-bottom: 1rem;
  }
</style>

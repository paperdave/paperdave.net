<script lang="ts">
  import { page } from '$app/stores';
  import Link from 'src/lib/link/Link.svelte';
  import QuestionRender from '../_lib/QuestionRender.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ question, isPending } = data);
</script>

{#if question && question.type === 'Normal'}
  <!-- <Meta title="question permalink: {formatDate(question.date, 'date-time')}" noIndex /> -->
{:else}
  <!-- <Meta title="question not found" noIndex /> -->
{/if}

{#key $page.params.id}
  {#if isPending}
    <section>
      <p>this question is awaiting an answer from dave, please be patient...</p>
    </section>
  {:else if question}
    {#if question.type === 'Reject'}
      <section>
        <p>ouch...</p>
      </section>
      <section>
        <QuestionRender {question} />
      </section>
      <section>
        <p>sorry, i rejected this question.</p>
        <p>
          <Link href="/q+a">view questions that do exist</Link>
        </p>
      </section>
    {:else}
      <section>
        <p>this page is a permalink for the following question:</p>
      </section>
      <section>
        <QuestionRender {question} />
      </section>
      {#if question.mentionedQuestions.length}
        <p>earlier:</p>
        {#each question.mentionedQuestions as mention}
          <section>
            <QuestionRender question={mention} />
          </section>
        {/each}
      {/if}
    {/if}
  {:else}
    <section>
      <p>
        yikes! <br />
        question permalink was not found. did you type it in manually?
      </p>
      <p>
        <Link href="/q+a">view questions that do exist</Link>
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

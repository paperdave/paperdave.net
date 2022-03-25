<script lang="ts">
  import { Question, QuestionParagraph, QuestionRequest } from '$lib/structures';
  import { escapeHTML } from '$lib/util$lib/utils/escapeort QaInput from './_QAInput.svelte';
  import QuestionRender from './_QuestionRender.svelte';
  import DismissSVG from '$lib/svg/fluent/Dismiss.svg';
  import AddSVG from '$lib/svg/fluent/Add.svg';
  import ChevronUpSVG from '$lib/svg/fluent/ChevronUp.svg';
  import ChevronDownSVG from '$lib/svg/fluent/ChevronDown.svg';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let request: QuestionRequest;
  $: response = new Question({
    date: request.date,
    content: [
      new QuestionParagraph({ who: 'QUESTION', message: escapeHTML(request.content) }),
      new QuestionParagraph({ who: 'ANSWER' }),
    ],
  });

  function reset() {
    // regenerate the response
    request = request;
  }

  function changeParagraphText(ev: Event, index: number) {
    response.content[index].message = (ev.target as HTMLInputElement).value;
  }

  function changeParagraphWho(index: number) {
    response.content[index].who = response.content[index].who === 'ANSWER' ? 'QUESTION' : 'ANSWER';
  }

  function removeParagraph(index: number) {
    response.content = response.content.filter((_, i) => i !== index);
  }

  function moveParagraphUp(index: number) {
    if (index === 0) return;
    const temp = response.content[index - 1];
    response.content[index - 1] = response.content[index];
    response.content[index] = temp;
  }

  function moveParagraphDown(index: number) {
    if (index === response.content.length - 1) return;
    const temp = response.content[index + 1];
    response.content[index + 1] = response.content[index];
    response.content[index] = temp;
  }

  function insertParagraph(before: number) {
    response.content = response.content
      .slice(0, before)
      .concat(new QuestionParagraph({ who: 'ANSWER' }))
      .concat(response.content.slice(before));
  }

  function send() {
    dispatch('send', response);
  }

  function deny() {
    response.content = [];
    dispatch('send', response);
  }
</script>

<main>
  <section>
    <div style="display:flex">
      <QaInput type="button" on:click={reset}>reset</QaInput>
      <QaInput type="button" on:click={send}>answer</QaInput>
      <QaInput type="button" on:click={deny}>deny</QaInput>
      <p>(you can press f2 to split)</p>
    </div>
    <div class="date">
      {request.date}
    </div>
    <pre class="prompt">{request.content}</pre>
    <hr />
    {#each response.content as paragraph, i}
      {#key paragraph._uid}
        <div class="response-row">
          <QaInput type="button" on:click={() => insertParagraph(i)}>
            <AddSVG />
          </QaInput>
          <QaInput type="button" on:click={() => moveParagraphUp(i)} disabled={i === 0}>
            <ChevronUpSVG />
          </QaInput>
          <QaInput
            type="button"
            on:click={() => moveParagraphDown(i)}
            disabled={i === response.content.length - 1}>
            <ChevronDownSVG />
          </QaInput>
          <QaInput type="button" on:click={() => removeParagraph(i)}>
            <DismissSVG />
          </QaInput>
          <QaInput type="button" on:click={() => changeParagraphWho(i)}>
            {paragraph.who === 'QUESTION' ? 'Q' : 'A'}
          </QaInput>
          <QaInput
            type="text"
            bind:value={paragraph.message}
            fullWidth
            on:input={(ev) => changeParagraphText(ev, i)} />
        </div>
      {/key}
    {/each}
    <div class="response-row">
      <QaInput type="button" on:click={() => insertParagraph(response.content.length)}>
        <AddSVG />
      </QaInput>
    </div>
  </section>
  <section class="q">
    <QuestionRender question={response} />
  </section>
</main>

<style lang="scss">
  main {
    display: flex;
    gap: 10px;
  }
  section {
    flex: 1;
    padding: 1rem;
  }
  section > div {
    margin-bottom: 10px;
  }
  .date {
    opacity: 0.5;
  }
  .prompt {
    background: #000;
    border: 1px solid white;
    padding: 1rem;
    color: #74d7c5;
    white-space: pre-wrap;
    max-width: 50rem;
  }
  hr {
    border: 0;
    border-top: 1px solid white;
    margin: 1rem 0;
  }
  .q {
    max-width: 800px;
  }
  .response-row {
    display: flex;
    height: 3rem;
    margin-bottom: 1rem;
    gap: 0.25rem;

    & > :global(button) {
      width: 2.5rem;
    }
    & > :global(input) {
      flex: 1 0 0px;
    }
  }
</style>

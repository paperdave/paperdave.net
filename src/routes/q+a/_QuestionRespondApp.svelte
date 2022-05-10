<script lang="ts">
  import { Question, QuestionParagraph, QuestionRequest } from '$lib/structures';
  import { escapeHTML } from '$lib/utils/escape';
  import QaInput from './_QAInput.svelte';
  import QuestionRender from './_QuestionRender.svelte';
  import { createEventDispatcher } from 'svelte';
  import Icon from '$lib/components/Icon.svelte';
  import TextBox from '$lib/components/TextBox.svelte';
  import Button from '$lib/components/Button.svelte';
  import AccentOverride from '$lib/components/AccentOverride.svelte';
  import { palette } from '$lib/theme';
  import { formatDate } from '$lib/utils/date';

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

  function changeParagraphText(message: string, index: number) {
    if (message) {
      response.content[index].message = message;
    }
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

<flex row class="root">
  <flex gap>
    <flex row gap>
      <AccentOverride accent={palette.green[500]}>
        <Button on:click={send} variant="accent">answer</Button>
      </AccentOverride>
      <AccentOverride accent={palette.red[500]}>
        <Button on:click={deny} variant="accent">deny</Button>
      </AccentOverride>
      <Button on:click={reset} variant="subtle">reset</Button>
    </flex>
    <div class="date">
      at {formatDate(request.date, 'date-time-sec')}
    </div>
    <pre class="prompt">{request.content}</pre>
    <flex class="paragraphs">
      {#each response.content as paragraph, i}
        {#key paragraph._uid}
          <flex row class="response-row">
            <Button center on:click={() => insertParagraph(i)}>
              <Icon name="add" />
            </Button>
            <Button center on:click={() => moveParagraphUp(i)} disabled={i === 0}>
              <Icon name="arrow_upward" />
            </Button>
            <Button
              center
              on:click={() => moveParagraphDown(i)}
              disabled={i === response.content.length - 1}>
              <Icon name="arrow_downward" />
            </Button>
            <Button center on:click={() => removeParagraph(i)}>
              <Icon name="close" />
            </Button>
            <AccentOverride
              accent={paragraph.who === 'QUESTION' ? palette.yellow[800] : palette.green[500]}>
              <Button variant="accent" center on:click={() => changeParagraphWho(i)}>
                {paragraph.who === 'QUESTION' ? 'Q' : 'A'}
              </Button>
            </AccentOverride>
            <TextBox
              type="text"
              value={paragraph.message}
              fullWidth
              on:change={(ev) => changeParagraphText(ev.detail, i)} />
          </flex>
        {/key}
      {/each}
      <div class="response-row">
        <Button center on:click={() => insertParagraph(response.content.length)}>
          <Icon name="add" />
        </Button>
      </div>
    </flex>
  </flex>
  <section class="q">
    <QuestionRender question={response} />
  </section>
</flex>

<style lang="scss">
  .root > flex {
    flex: 1;
  }

  section {
    flex: 1;
    padding: 1rem;
  }

  .prompt {
    border: 1px solid hsl(var(--fg));
    border-radius: 4px;
    background: #000;
    padding: 1rem;
    color: #74d7c5;
    white-space: pre-wrap;
  }

  .q {
    max-width: 800px;
  }

  .paragraphs {
    gap: 0.3rem;
  }

  .response-row {
    display: flex;
    gap: 0.25rem;
    height: 3rem;

    & :global(button) {
      width: 2rem;
    }
    & :global(input) {
      flex: 1 0 0px;
    }
  }
</style>

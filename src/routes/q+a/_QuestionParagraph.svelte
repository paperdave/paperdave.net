<script lang="ts">
  import { QuestionParagraph } from '$lib/structures';

  export let paragraph: QuestionParagraph;

  let RootElement = 'p';
  let what = paragraph.message;
  let props = {};

  if (what.startsWith('RootElement=')) {
    RootElement = /RootElement=(.*?)\{/.exec(what)[1];
    let depth = 1;
    let jsonString;
    for (let i = 13 + RootElement.length; i < what.length; i++) {
      if (what[i] === '}') {
        depth--;
        if (depth === 0) {
          jsonString = what.slice(12 + RootElement.length, i + 1);
          what = what.slice(12 + RootElement.length + jsonString.length);
          break;
        }
      }
      if (what[i] === '{') {
        depth++;
      }
    }
    if (!jsonString) {
      throw new Error('Could not find JSON string');
    }
    props = JSON.parse(jsonString);
  }
</script>

<main class:q={paragraph.isQuestion()} class:a={paragraph.isAnswer()}>
  {@html paragraph.message}
</main>

<style lang="scss">
  .q {
    font-family: 'Roboto Slab';
    font-size: 1.15em;
    color: white;
    font-weight: 400;
  }

  .a {
    color: #51d064;
  }
</style>

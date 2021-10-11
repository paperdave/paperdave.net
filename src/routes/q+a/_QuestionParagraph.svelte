<script lang="ts">
  import { Question, QuestionParagraph } from '$lib/structures';

  export let question: Question;
  export let paragraph: QuestionParagraph;
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

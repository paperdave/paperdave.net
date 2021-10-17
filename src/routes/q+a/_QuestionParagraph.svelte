<script lang="ts">
  import { QuestionParagraph } from '$lib/structures';

  export let paragraph: QuestionParagraph;
</script>

<main class:q={paragraph.isQuestion()} class:a={paragraph.isAnswer()}>
  {@html paragraph.message}
</main>

<style lang="scss">
  main {
    line-height: 1.25rem;
    margin-bottom: 0.5rem;
  }

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

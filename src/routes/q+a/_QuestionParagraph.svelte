<script lang="ts">
  import { QuestionParagraph } from '$lib/structures';

  export let paragraph: QuestionParagraph;
  export let search: string;
</script>

<main class:q={paragraph.who === 'QUESTION'} class:a={paragraph.who === 'ANSWER'}>
  {@html paragraph.message.replace(search, '<span class="highlight">$&</span>')}
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

    --text-casual: 0.5;
  }
</style>

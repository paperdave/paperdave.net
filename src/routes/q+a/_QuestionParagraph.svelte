<script lang="ts">
  import { QuestionParagraph } from '$lib/structures';

  export let paragraph: QuestionParagraph;
  export let search: string;
</script>

<p class:q={paragraph.who === 'QUESTION'} class:a={paragraph.who === 'ANSWER'}>
  {@html paragraph.message}
  <!-- {@html paragraph.message.replace(search, '<span class="highlight">$&</span>')} -->
</p>

<style lang="scss">
  p {
    margin-bottom: 0.5rem;
    line-height: 1.25rem;
  }

  .q {
    color: white;
    font-weight: 400;
    font-size: 1.15em;
    font-family: 'Roboto Slab';
  }

  .a {
    --text-casual: 0.5;
    color: #51d064;
  }

  p :global(.highlight) {
    background-color: #ffff0044;
  }
</style>

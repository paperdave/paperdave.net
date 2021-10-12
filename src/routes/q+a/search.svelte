<script lang="ts" context="module">
  import { Question } from '$lib/structures';
  import type { Load } from '@sveltejs/kit';
  import QAHeader from './_QAHeader.svelte';

  export const load: Load = async ({}) => {
    return {
      props: {
        questions: [],
      },
    };
  };
</script>

<script lang="ts">
  export let questions: Question[];
</script>

<main>
  <QAHeader />

  <section>
    <p>i answer anonymous questions you ask, because it's fun.</p>
    <p>
      <a href="/q+a">latest</a>
      |
      <strong>search</strong>
      |
      <a href="/q+a/random">random</a>
      |
      <a href="/q+a?page=0">start</a>
    </p>
  </section>
  <!-- <section class="form">
    <QaInput type="text" placeholder="search..." fullWidth />
  </section> -->
  <section>
    <p>[search will be added soon]</p>
  </section>
</main>

<style lang="scss">
  section {
    margin-bottom: 3rem;
  }
  p {
    margin-bottom: 1rem;
  }

  .form {
    max-width: 600px;
  }
</style>

<script context="module" lang="ts">
  import { BrainPost } from '$lib/structures';
  import type { JSONData } from '$lib/structures';
  import type { Load } from '@sveltejs/kit';
  import marked from 'marked';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/brain/get-brain').then((res) => res.json());
    return {
      props: {
        posts: res.map((x: JSONData<BrainPost>) => BrainPost.fromJSON(x)),
      },
    };
  };

  function formatDate(date: Date) {
    const dateEst = new Date(date.toLocaleString('en-US', { timeZone: 'America/Detroit' }));
    return [
      dateEst.getFullYear().toString(),
      '-',
      (dateEst.getMonth() + 1).toString(),
      '-',
      dateEst.getDate().toString(),
      ' ',
      dateEst.getHours().toString(),
      ':',
      dateEst.getMinutes().toString(),
    ]
      .map((x) => (x.match(/[0-9]/) ? x.padStart(2, '0') : x))
      .join('');
  }
</script>

<script lang="ts">
  export let posts: BrainPost[];
</script>

<main>
  <div class="container">
    <header>
      <h1>thoughts from my brain</h1>
      <p>
        on the <a href="/discord">discord</a>, i keep a channel of my thoughts. this page reflects
        those.
      </p>
      <p>
        <em>note:</em> i have to do a lot more work on this page, as a lot of discord formatting doesn't
        copy over just yet, but it's a start.
      </p>
    </header>
    {#each posts as post}
      <article>
        <date>{formatDate(post.date)}</date>
        <div class="content">
          {@html marked(post.text)}
        </div>
      </article>
    {/each}
  </div>
</main>

<style lang="scss">
  main {
    background-color: #072207;
    color: white;
  }
  a {
    color: #edb9dd;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #f9d6f9;
    }
  }
  header {
    color: #c6eec9;
  }
  .container {
    max-width: 800px;
    margin: auto;
  }
  h1 {
    margin-top: 2rem;
    font-weight: 100;
  }
  article {
    margin: 2rem 0;
  }
  date {
    display: block;
    color: #c6eec988;
  }
  .content {
    color: #51d064;
  }
</style>

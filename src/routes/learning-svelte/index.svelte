<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    return {
      props: {
        files: Object.keys(import.meta.glob('./day-*.svelte')).map((file) => file.slice(2, -7)),
      },
    };
  };

  export function formatPageName(file: string) {
    return file
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }
</script>

<script lang="ts">
  export let files: string[];
</script>

<main>
  <h1>learning svelte</h1>
  <p>
    After three years of owning this domain, I decided to learn Svelte and write the entire site
    with it. At the start, i updated the homepage every day. Here are all the pages I've written so
    far.
  </p>
  <ul>
    {#each files as file}
      <li>
        - <a href="/learning-svelte/{file}">{formatPageName(file)}</a>
      </li>
    {/each}
  </ul>
</main>

<style lang="scss">
  main {
    background: #cecece;
    color: #101010;
    padding: 2rem;
  }

  p,
  ul,
  h1 {
    margin: 1rem;
    max-width: 500px;
  }

  ul {
    padding-left: 1rem;
  }

  a {
    color: #559f42;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #2f5b42;
    }
  }

  button {
    border: 1px solid black;
    padding: 0.5rem 1rem;
  }
</style>

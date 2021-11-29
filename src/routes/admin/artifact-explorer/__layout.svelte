<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = restrictedPage([Permission.VIEW_ARTIFACTS]);
</script>

<script lang="ts">
  import DismissSVG from '$lib/svg/Dismiss.svg?component';
  import Sidebar from './_Sidebar.svelte';
  import { Permission } from '$lib/structures';
  import { restrictedPage } from '$lib/utils/client';
</script>

<main class="fds-dark">
  <header>
    <div>
      <a href="/admin" class="icon">
        <DismissSVG />
      </a>
    </div>
    <div class="title">
      <span class="davecode"> davecode </span>
      &nbsp; Artifact Explorer
    </div>
  </header>

  <aside>
    <Sidebar />
  </aside>

  <article>
    <slot />
  </article>
</main>

<style lang="scss">
  main {
    user-select: none;

    display: grid;
    height: 100vh;
    background-color: #101010;
    color: white;

    grid-template-columns: 25rem 1fr;
    grid-template-rows: 3rem calc(100vh - 3rem);
    grid-template-areas:
      'header header'
      'aside main';
  }
  .davecode {
    font-family: 'Roboto Slab';
    font-weight: bold;
  }
  aside {
    grid-area: aside;
    background-color: #101010;
  }
  article {
    grid-area: main;
    background-color: #202020;
    color: white;
    overflow-y: auto;
  }
  header {
    grid-area: header;
    background-color: #303030;
    height: 3rem;
    display: flex;
    align-items: center;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      cursor: pointer;
      & > :global(svg) {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
</style>

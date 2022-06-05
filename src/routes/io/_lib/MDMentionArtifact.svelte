<script lang="ts">
  import { browser } from '$app/env';

  import Icon from '$lib/components/Icon.svelte';
  import type { ArtifactEntry, ArtifactType } from '@prisma/client';
  import type { ASTNode } from 'svelte-simple-markdown';

  export let node: ASTNode;

  $: data = null as Pick<ArtifactEntry, 'title' | 'type'>;

  let currentFetchId = 0;
  function fetchData() {
    let fetchId = ++currentFetchId;
    fetch(`/io/api/artifact/${node.id}`)
      .then((res) => res.json())
      .then((newData) => {
        if (fetchId === currentFetchId) {
          data = newData;
        }
      });
  }

  $: browser && !data && fetchData();

  const artifactTypeToIcon: Record<ArtifactType, string> = {};
</script>

<a sveltekit:prefetch class="custom" href="/{node.id}">
  {#if data}
    <span class="icon">
      <Icon name={artifactTypeToIcon[data.type]} />
    </span>
    {data.title}
  {:else}
    ...
  {/if}
</a>

<style lang="scss">
  a {
    color: white;
    transition: background-color 0.2s ease-in-out;
    border-radius: 4px;
    background-color: #c6222255;
    padding: 0 0.25rem;

    &:hover {
      background-color: #c62222aa;
    }
    &:active {
      transition-duration: 0ms;
      background-color: rgb(198, 34, 34);
    }
  }
  .icon {
    display: inline-grid;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 0.8rem;
  }
</style>

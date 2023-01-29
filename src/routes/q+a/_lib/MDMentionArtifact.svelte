<script lang="ts">
  import { browser } from '$app/environment';
  import Icon from 'src/components/Icon.svelte';
  import type { ArtifactEntry, ArtifactType } from '@prisma/client';
  import { getContext } from 'svelte';
  import type { ASTNode } from 'svelte-simple-markdown';
  import { resolvedArtifactContext } from './MessageRender.svelte';

  export let node: ASTNode;

  const context = getContext(resolvedArtifactContext) ?? {};

  $: data = context[node.id] as Pick<ArtifactEntry, 'title' | 'type'> | null;

  let currentFetchId = 0;
  function fetchData() {
    let fetchId = ++currentFetchId;
    fetch(`/q+a/api/artifact/${node.id}`).then((x) => {
      if (x.status === 200) {
        return x.json().then((newData) => {
          if (fetchId === currentFetchId) {
            data = newData;
          }
        });
      } else {
        data = null;
      }
    });
  }
  $: browser && !data && fetchData();

  const artifactTypeToIcon: Record<ArtifactType, string> = {
    Application: 'grid_view',
    Doodle: 'draw',
    Fragment: 'atr',
    Game: 'sports_esports',
    Journal: '',
    Music: 'music_note',
    MusicVideo: 'music_note',
    NerdGear: 'terminal',
    Square: 'photo',
    Story: 'description',
    Video: 'videocam',
    WordMagnet: 'draft'
  };

  const artifactTypeToBaseURL: Record<ArtifactType, string> = {
    Application: 'app',
    Doodle: 'doodle',
    Fragment: 'fragment',
    Game: 'games',
    Journal: 'journal',
    Music: 'music',
    MusicVideo: 'videos',
    NerdGear: 'nerd-gear',
    Square: 'square',
    Story: 'stories',
    Video: 'videos',
    WordMagnet: 'word-magnet'
  };
</script>

<a class="custom" href="/{data ? artifactTypeToBaseURL[data.type] : '_resolveId'}/{node.id}">
  {#if data}
    <span class="icon">
      <Icon name={artifactTypeToIcon[data.type]} />
    </span>
    {data.title}
  {:else}
    unresolved: {node.id}
  {/if}
</a>

<style lang="scss">
  a {
    font-family: 'Recursive', sans-serif;
    font-size: 1rem;
    color: white;
    transition: background-color 0.2s ease-in-out;
    border-radius: 4px;
    background-color: #c6222255;
    padding: 0 0.4rem;

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
    transform: scale(1.4) translateY(0.6px);
  }
</style>

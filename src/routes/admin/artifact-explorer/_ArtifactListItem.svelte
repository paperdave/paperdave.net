<script lang="ts">
  import { Artifact, ArtifactVisibility } from '$lib/structures';
  import { SvelteComponentDev } from 'svelte/internal';

  import GlobeSVG from '$lib/svg/Globe.svg?component';
  import DocumentEditSVG from '$lib/svg/DocumentEdit.svg?component';
  import LinkSVG from '$lib/svg/Link.svg?component';
  import LockSVG from '$lib/svg/Lock.svg?component';
  import AddSVG from '$lib/svg/Add.svg?component';
  import VideoClipSVG from '$lib/svg/VideoClip.svg?component';
  import MusicSVG from '$lib/svg/Music.svg?component';
  import AppsSVG from '$lib/svg/Apps.svg?component';
  import CodeSVG from '$lib/svg/Code.svg?component';
  import GamesSVG from '$lib/svg/Games.svg?component';
  import GraveSVG from '$lib/svg/Grave.svg?component';
  import PuzzlePieceSVG from '$lib/svg/PuzzlePiece.svg?component';
  import NotepadSVG from '$lib/svg/Notepad.svg?component';
  import MagnetSVG from '$lib/svg/Magnet.svg?component';
  import SquareSVG from '$lib/svg/Magnet.svg?component';
  import EditSVG from '$lib/svg/Edit.svg?component';
  import { page } from '$app/stores';

  const typeToIcon: Record<string, typeof SvelteComponentDev> = {
    video: VideoClipSVG,
    music: MusicSVG,
    app: AppsSVG,
    fragment: PuzzlePieceSVG,
    graveyard: GraveSVG,
    journal: NotepadSVG,
    'nerd-gear': CodeSVG,
    game: GamesSVG,
    story: EditSVG,
    'word-magnet': MagnetSVG,
    square: SquareSVG,
  };
  const artifactVisibilityToIcon: Record<ArtifactVisibility, typeof SvelteComponentDev> = {
    [ArtifactVisibility.PUBLIC]: GlobeSVG,
    [ArtifactVisibility.PRIVATE]: LockSVG,
    [ArtifactVisibility.UNLISTED]: LinkSVG,
    [ArtifactVisibility.DRAFT]: DocumentEditSVG,
  };

  export let artifact: Artifact | 'new';

  $: selected = artifact !== 'new' && $page.path === `/admin/artifact-explorer/${artifact.id}`;
</script>

{#if artifact === 'new'}
  <a href="/admin/artifact-explorer/new">
    <span class="icon"><AddSVG /></span>
    <span class="title">New Artifact</span>
  </a>
{:else}
  <a href="/admin/artifact-explorer/{artifact.id}" class:selected>
    <span class="icon">
      <svelte:component this={artifactVisibilityToIcon[artifact.visibility]} />
    </span>
    <span class="icon">
      {#if typeToIcon[artifact.type]}
        <svelte:component this={typeToIcon[artifact.type]} />
      {:else}
        <span class="type">{artifact.type}</span>
      {/if}
    </span>
    <span class="date">
      {artifact.date.getFullYear()}-{(artifact.date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-{artifact.date.getDate().toString().padStart(2, '0')}
    </span>
    <span class="title">{artifact.id}</span>
  </a>
{/if}

<style lang="scss">
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.5rem;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.2);
    }
    gap: 0.5rem;
  }
  .selected {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    & > :global(svg) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .date {
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.5);
    font-family: Hack, monospace;
  }
</style>

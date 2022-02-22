<script lang="ts">
  import { Artifact, ArtifactVisibility } from '$lib/structures';
  import { SvelteComponentDev } from 'svelte/internal';

  import GlobeSVG from '$lib/svg/fluent/Globe.svg?component';
  import DocumentEditSVG from '$lib/svg/fluent/DocumentEdit.svg?component';
  import LinkSVG from '$lib/svg/fluent/Link.svg?component';
  import LockSVG from '$lib/svg/fluent/Lock.svg?component';
  import AddSVG from '$lib/svg/fluent/Add.svg?component';
  import VideoClipSVG from '$lib/svg/fluent/VideoClip.svg?component';
  import MusicSVG from '$lib/svg/fluent/Music.svg?component';
  import AppsSVG from '$lib/svg/fluent/Apps.svg?component';
  import CodeSVG from '$lib/svg/fluent/Code.svg?component';
  import GamesSVG from '$lib/svg/fluent/Games.svg?component';
  import GraveSVG from '$lib/svg/fluent/Grave.svg?component';
  import PuzzlePieceSVG from '$lib/svg/fluent/PuzzlePiece.svg?component';
  import NotepadSVG from '$lib/svg/fluent/Notepad.svg?component';
  import MagnetSVG from '$lib/svg/fluent/Magnet.svg?component';
  import SquareSVG from '$lib/svg/fluent/Magnet.svg?component';
  import EditSVG from '$lib/svg/fluent/Edit.svg?component';
  import { page } from '$app/stores';
  import { formatDate } from '$lib/utils/date';
  import { ListItem } from 'fluent-svelte';
  import { goto } from '$app/navigation';

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

  export let artifact: Artifact;

  $: selected = $page.path === `/admin/artifact-explorer/${artifact.id}`;
</script>

<ListItem {selected} href="/admin/artifact-explorer/{artifact.id}">
  <main>
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
      {formatDate(artifact.date, 'date')}
    </span>
    <span class="title">{artifact.id}</span>
  </main>
</ListItem>

<style lang="scss">
  main {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.5rem;
    gap: 0.25rem;
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

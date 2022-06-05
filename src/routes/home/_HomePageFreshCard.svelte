<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Img from '$lib/components/Img.svelte';
  import { formatDate } from '$lib/utils/date';
  import type { ArtifactEntry, ArtifactType } from '@prisma/client';

  export let artifact: ArtifactEntry;

  const artifactTypeToFolder: Record<ArtifactType, string> = {
    Application: 'apps',
    Doodle: 'treehouse/doodles',
    Fragment: 'fragments',
    Game: 'games',
    Journal: '???',
    Music: 'music',
    MusicVideo: 'videos',
    NerdGear: 'nerd-gear',
    Square: 'treehouse/squares',
    Story: 'stories',
    Video: 'videos',
    WordMagnet: 'treehouse/word-magnets',
  };
  const artifactTypeToDisplayName: Record<ArtifactType, string> = {
    Application: 'Application',
    Doodle: 'Doodle',
    Fragment: 'Fragment',
    Game: 'Game',
    Journal: 'Journal Entry',
    Music: 'Music',
    MusicVideo: 'Music Video',
    NerdGear: 'Nerd Gear',
    Square: 'Square Photo',
    Story: 'Story',
    Video: 'Video',
    WordMagnet: 'Word Magnet',
  };
</script>

<article>
  <Button href={`/${artifactTypeToFolder[artifact.type]}/${artifact.id}`} variant="normal">
    {#if artifact.thumb}
      <div class="thumbnail">
        <Img src={artifact.thumb} alt={artifact.title} />
      </div>
    {/if}
    <flex class="items">
      <h3 class="custom">{artifact.title}</h3>
      <p>
        {artifactTypeToDisplayName[artifact.type]}
      </p>
      <p>
        {formatDate(artifact.date, 'date')}
      </p>
    </flex>
  </Button>
</article>

<style lang="scss">
  .root {
    width: 100%;
  }
  .thumbnail {
    display: flex;
    margin-right: 10px;
    border: 1px solid white;
    border-radius: 3px;
    aspect-ratio: 16/9;
    height: 5.5rem;
    overflow: hidden;
    & > * {
      flex: 1;
    }
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
  }
  @media (max-width: 400px) {
    .thumbnail {
      height: 3rem;
    }
  }
</style>

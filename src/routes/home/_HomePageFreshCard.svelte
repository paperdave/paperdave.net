<script lang="ts">
  import BlurHash from '$lib/components/BlurHash.svelte';
  import Button from '$lib/components/Button.svelte';
  import { Artifact } from '$lib/structures';
  import { formatDate } from '$lib/utils/date';

  export let artifact: Artifact;

  function formatType(type: string) {
    return type.replace(/-/g, ' ');
  }
</script>

<Button href={artifact.getURL().pathname} variant="normal">
  <flex row class="root">
    {#if artifact.thumb}
      <div class="thumbnail">
        {#if artifact.thumb.hash}
          <BlurHash src={artifact.thumb.url} hash={artifact.thumb.hash} alt={artifact.title} />
        {:else}
          <img src={artifact.thumb.url} alt={artifact.title} />
        {/if}
      </div>
    {/if}
    <flex>
      <h3 class="custom">{artifact.title}</h3>
      <!-- <p>
        {formatType(artifact.type)}
      </p> -->
      <p>
        {formatDate(artifact.date, 'date')}
      </p>
    </flex>
  </flex>
</Button>

<style lang="scss">
  .root {
    width: 30rem;
  }
  .thumbnail {
    display: flex;
    height: 6rem;
    aspect-ratio: 16/9;
    margin-right: 10px;
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid white;
    & > * {
      flex: 1;
    }
  }
</style>

<script lang="ts">
  import BlurHash from '$lib/components/BlurHash.svelte';
  import Button from '$lib/components/Button.svelte';
  import { formatDate } from '$lib/utils/date';

  export let artifact: unknown;

  function formatType(type: string) {
    return type.replace(/_/g, ' ').toLowerCase();
  }
</script>

<article>
  <Button href={artifact.getURL().pathname} variant="normal">
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
      <p>
        {formatType(artifact.type)}
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
    height: 6rem;
    overflow: hidden;
    & > * {
      flex: 1;
    }
  }
  @media (max-width: 400px) {
    .thumbnail {
      height: 3rem;
    }
  }
</style>

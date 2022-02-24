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

<Button href={artifact.getUrl()} variant="normal">
  <flex row class="root">
    {#if artifact.thumbnail}
      <div class="thumbnail">
        {#if artifact.blurhash}
          <BlurHash src={artifact.thumbnail} hash={artifact.blurhash} alt={artifact.title} />
        {:else}
          <img src={artifact.thumbnail} alt={artifact.title} />
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
  </flex>
</Button>

<style lang="scss">
  .root {
    width: 30rem;
  }
  .thumbnail {
    display: flex;
    height: 6rem;
    width: 6rem;
    margin-right: 10px;
    & > * {
      flex: 1;
    }
  }
</style>

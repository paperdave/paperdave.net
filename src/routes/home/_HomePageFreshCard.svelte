<script lang='ts'>
  import Button from "$lib/components/Button.svelte";
  import { Artifact } from "$lib/structures";
  import { formatDate } from "$lib/utils/date";
  
  export let artifact: Artifact;
</script>

<Button href={artifact.getUrl()} variant='normal'>
  <flex row>
    <div class="image-container">
      .........
    </div>
    <flex>
      <h3 class='custom'>{artifact.title}</h3>
      <p>
        {formatDate(artifact.date, 'date')}
      </p>
    </flex>
  </flex>
</Button>
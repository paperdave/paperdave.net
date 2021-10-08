<script lang="ts">
  const pages = ['./server-error-api', './server-error-component'];
</script>

<ul>
  {#each pages as page}
    <li>
      <a href={page}>{page}</a>
    </li>
  {/each}
</ul>

<script lang="ts">
  export let artifact: { url: string; title: string };
</script>

<iframe src={artifact.url} frameborder="0" title={artifact.title} />

<style lang="scss">
  iframe {
    flex: 1;
    min-height: 900px;
  }
</style>

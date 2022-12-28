<script>
  import { Button } from '$lib';
</script>

<back-button>
  <Button variant="normal" href="/"><slot>go home</slot></Button>
</back-button>

<style lang="scss">
  back-button {
    position: relative;
    top: -1.5rem;
    margin-bottom: -2rem;
    display: flex;

    & :global(input-button *) {
      padding: 0.25rem 0.4rem;
      font-size: 0.9rem;
      border-color: rgba(var(--on-bg), 0.2);
    }
  }
</style>

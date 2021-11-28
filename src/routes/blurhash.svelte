<script lang="ts">
  import BlurHash from '$lib/components/BlurHash.svelte';

  let show = false;
</script>

<main>
  <h1>Blur Hash Test</h1>
  <p>okay</p>

  <button
    on:click={() => {
      show = !show;
    }}>
    {show ? 'Hide' : 'Show'}
  </button>
  <div style="width: 500px; aspect-ratio: 16/9;">
    {#if show}
      <BlurHash
        src={'https://media.davecode.net/content/2021/revolution.jpeg'}
        hash={`LHFhlH-tD,4.Mut1NYW85#oxJMbF`}
        alt={'the revolution begins now'} />
    {/if}
  </div>
</main>

<style lang="scss">
</style>

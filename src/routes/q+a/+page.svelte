<script lang="ts">
  import type { PageData } from './$types';
  import MessageRender from './_lib/MessageRender.svelte';

  export let data: PageData;
</script>

{#each data.messages as message}
  <MessageRender
    message={{
      type: message.type ?? 'NORMAL',
      text: message.text,
      date: message.date,
      artifacts: message.artifacts
    }}
  />
{/each}

<style lang="scss">
</style>

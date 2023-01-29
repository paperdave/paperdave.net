<script lang="ts">
  import TextBox from 'src/lib/input-textbox/TextBox.svelte';
  import type { PageData } from './$types';
  import MessageForm from './_lib/MessageForm.svelte';
  import MessageRender from './_lib/MessageRender.svelte';

  export let data: PageData;
</script>

<p>rules: be reasonable</p>

<MessageForm />

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

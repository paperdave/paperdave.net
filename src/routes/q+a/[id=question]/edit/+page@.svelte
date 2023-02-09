<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';

  import QuestionRespondPage from '../../_lib/QuestionRespondPage.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ThemeRoot background="#111" primary="#faa719" secondary="#ff3a32" foreground="#f0f0f0">
  {#if data.question}
    {#if browser}
      <QuestionRespondPage
        question={data.question}
        on:deleted={() => {
          goto('/io');
        }}
      />
    {/if}
  {:else}
    <p>Message not found</p>
  {/if}
</ThemeRoot>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { api } from '$lib/session';

  import type { Message } from '@prisma/client';
  import MessageRespondPage from '../_lib/MessageRespondPage.svelte';

  const { data: message, isLoading } = api.useSWR<Message>(`/io/api/get?id=${$page.params.id}`);
</script>

{#if $message}
  <MessageRespondPage
    message={$message}
    on:deleted={() => {
      goto('/io');
    }} />
{:else if $isLoading}
  <p class="loading">Loading...</p>
{:else}
  <p>Message not found</p>
{/if}

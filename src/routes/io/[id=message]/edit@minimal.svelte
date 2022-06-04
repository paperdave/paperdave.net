<script lang="ts">
  import { goto } from '$app/navigation';

  import type { Message } from '@prisma/client';
  import MessageRespondPage from '../_lib/MessageRespondPage.svelte';

  export let message: Message;
</script>

<MessageRespondPage
  {message}
  on:deleted={() => {
    goto('/io');
  }} />

<script lang="ts">
  import type { Message } from '@prisma/client';
  import MessageRespondPage from './_lib/MessageRespondPage.svelte';

  const message: Message = {
    type: 'NORMAL',
    date: new Date(),
    text: ['i: Hello, world!', 'answer here'].join('\n\n'),
  };
</script>

<MessageRespondPage {message} isSandbox />

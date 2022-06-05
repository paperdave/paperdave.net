<script lang="ts">
  import type { Message } from '@prisma/client';
  import MessageRespondPage from './_lib/MessageRespondPage.svelte';

  const message: Message = {
    type: 'NORMAL',
    date: new Date(),
    text: [
      'i: Hello, world!',
      'example response 1, supports *markdown*',
      'reference to another message: #220604173159',
      'reference to an artifact: @im-18-now',
    ].join('\n\n'),
  };
</script>

<MessageRespondPage {message} />

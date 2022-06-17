<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import { formatDate } from '$lib/utils/date';
  import type { Message } from '@prisma/client';
  import MessageRender from '../_lib/MessageRender.svelte';

  export let message: Message;
  export let isPending: boolean;
</script>

{#if message && message.type === 'NORMAL'}
  <Meta title="message permalink: {formatDate(message.date, 'date-time')}" noIndex />
{:else}
  <Meta title="question not found" noIndex />
{/if}

{#key message && new Date(message.date).getTime()}
  {#if message}
    {#if isPending}
      <section>
        <p>this message is awaiting an answer from dave, please be patient...</p>
      </section>
    {:else if message.type === 'REJECT'}
      <section>
        <p>ouch...</p>
      </section>
      <section>
        <MessageRender {message} />
      </section>
      <section>
        <p>tip for the future: do not send that, i guess.</p>
      </section>
    {:else}
      <section>
        <p>this page is a permalink for the following message:</p>
      </section>
      <section>
        <MessageRender {message} />
      </section>
    {/if}
  {:else}
    <section>
      <p>
        yikes! <br />
        message permalink was not found. did you type it in manually?
      </p>
      <p>
        <a href="/io">view messages that do exist</a>
      </p>
    </section>
  {/if}
{/key}

<style lang="scss">
  section {
    margin-bottom: 3rem;
  }
  p {
    margin-bottom: 1rem;
  }
</style>

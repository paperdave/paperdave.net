<script lang="ts">
  import { page } from '$app/stores';
  import Link from 'src/lib/link/Link.svelte';
  import MessageRender from '../_lib/MessageRender.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ message, isPending } = data);
</script>

{#if message && message.type === 'NORMAL'}
  <!-- <Meta title="message permalink: {formatDate(message.date, 'date-time')}" noIndex /> -->
{:else}
  <!-- <Meta title="question not found" noIndex /> -->
{/if}

{#key $page.params.id}
  {#if isPending}
    <section>
      <p>this message is awaiting an answer from dave, please be patient...</p>
    </section>
  {:else if message}
    {#if message.type === 'REJECT'}
      <section>
        <p>ouch...</p>
      </section>
      <section>
        <MessageRender {message} />
      </section>
      <section>
        <p>sorry, i rejected this question.</p>
        <p>
          <Link href="/q+a">view questions that do exist</Link>
        </p>
      </section>
    {:else}
      <section>
        <p>this page is a permalink for the following question:</p>
      </section>
      <section>
        <MessageRender {message} />
      </section>
      {#if message.mentionedMessages.length}
        <p>earlier:</p>
        {#each message.mentionedMessages as mentionedMessage}
          <section>
            <MessageRender message={mentionedMessage} />
          </section>
        {/each}
      {/if}
    {/if}
  {:else}
    <section>
      <p>
        yikes! <br />
        question permalink was not found. did you type it in manually?
      </p>
      <p>
        <Link href="/q+a">view questions that do exist</Link>
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

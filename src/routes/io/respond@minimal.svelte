<script context="module" lang="ts">
  import { restrictedPage } from '$lib/utils/restricted-page';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = restrictedPage([Permission.RESPOND_TO_QUESTIONS], async ({ fetch }) => {
    const API = wrapAPI(fetch);

    return {
      props: {
        requests: await API.questions.getAllRequests(),
      },
    };
  });
</script>

<script lang="ts">
  import QaHeader from './_IOHeader.svelte';
  import QuestionRespondApp from './_lib/QuestionRespondApp.svelte';
  import RestrictedPageRoot from '$lib/components/RestrictedPageRoot.svelte';
  import Meta from '$lib/components/Meta.svelte';

  export let requests: QuestionRequest[] = [];

  $: latestRequest = requests[0];

  let sending = false;

  async function publishNewQuestion(q: Question, request: QuestionRequest) {
    try {
      sending = true;

      await Promise.all([
        //
        API.questions.createQuestion(q),
        API.questions.deleteRequest(request),
      ]);

      // update ui
      requests = requests.slice(1);
    } catch (error) {
      console.error(error);
    } finally {
      sending = false;
    }
  }
</script>

<Meta title="question dashboard" noIndex />

<RestrictedPageRoot>
  <main>
    <div style="pointer-events:none">
      <QaHeader />
    </div>
    <div class="stats">
      <p>#q: {requests.length}</p>
    </div>
    {#if latestRequest}
      {#key latestRequest.date.getTime()}
        <QuestionRespondApp
          request={latestRequest}
          on:send={(ev) => publishNewQuestion(ev.detail, latestRequest)} />
      {/key}
    {:else}
      <p>caught up :D</p>
    {/if}
  </main>
</RestrictedPageRoot>

<style lang="scss">
  .stats {
    position: absolute;
    top: 20px;
    left: 500px;
  }
</style>

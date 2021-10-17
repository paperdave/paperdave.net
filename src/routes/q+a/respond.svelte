<script context="module" lang="ts">
  import type { JSONData } from '$lib/structures';
  import { QuestionRequest, UserPermission } from '$lib/structures';

  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ session, page, fetch }) => {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/auth?r=' + encodeURIComponent(page.path),
      };
    }

    return {
      props: {
        isAuthorized: session.user.permissions.includes(UserPermission.RESPOND_TO_QUESTIONS),
        questions: session.user.permissions.includes(UserPermission.RESPOND_TO_QUESTIONS)
          ? await fetch('/q+a/get-requests')
              .then((x) => x.json())
              .then((x) => x.map((y: JSONData<QuestionRequest>) => QuestionRequest.fromJSON(y)))
          : [],
      },
    };
  };
</script>

<script lang="ts">
  import QaHeader from './_QAHeader.svelte';

  export let isAuthorized: boolean;
  export let questions: QuestionRequest[];
</script>

<main>
  <QaHeader />
  {#if isAuthorized}
    <!-- <QuestionRespondApp bind:questions /> -->
    {JSON.stringify(questions)}
  {:else}
    <p>You do not have permission to respond to questions.</p>
  {/if}
</main>

<style lang="scss">
</style>

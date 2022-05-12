<script lang="ts">
  import { page } from '$app/stores';
  import { user } from '$lib/api-client/session';
  import BackButton from '$lib/components/BackButton.svelte';
  import LinkRow from '$lib/components/LinkRow.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { Permission } from '$lib/structures';
  import { palette } from '$lib/theme';
  import QaHeader from './_QAHeader.svelte';
</script>

<ThemeRoot
  background={palette.grey[900]}
  accent={palette.yellow[800]}
  linkColor={palette.cyan[300]}>
  <Paper>
    <BackButton
      position="off-center-right"
      href={$page.url.pathname === '/q+a' ? '/' : '/q+a'}
      text={$page.url.pathname === '/q+a' ? 'go home' : 'all questions'} />
    <flex>
      <QaHeader />
      <flex gap>
        <p>i answer anonymous questions you ask, because it's fun.</p>

        <LinkRow>
          <li><a href="/q+a">latest</a></li>
          <li><a href="/q+a/search">search</a></li>
          <li><a href="/q+a/random">random</a></li>
          <li><a href="/q+a?page=0">start</a></li>

          {#if $user !== null && $user.queryPermission(Permission.RESPOND_TO_QUESTIONS)}
            <li><a href="/q+a/respond" class="special">respond</a></li>
          {/if}
        </LinkRow>
      </flex>
    </flex>

    <slot />
  </Paper>
</ThemeRoot>

<style lang="scss">
  flex {
    margin-bottom: 2rem;
  }
  .special {
    color: #faa719;
  }
</style>

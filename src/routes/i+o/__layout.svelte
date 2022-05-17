<script lang="ts">
  import { page } from '$app/stores';
  import BackButton from '$lib/components/BackButton.svelte';
  import LinkRow from '$lib/components/LinkRow.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
  import QaHeader from './_IOHeader.svelte';
</script>

<ThemeRoot
  background={palette.grey[900]}
  accent={palette.yellow[800]}
  linkColor={palette.cyan[300]}>
  <Paper>
    <BackButton
      position="off-center-right"
      href={$page.url.pathname === '/i+o' ? '/' : '/i+o'}
      text={$page.url.pathname === '/i+o' ? 'go home' : 'all messages'} />
    <flex>
      <QaHeader />
      <flex gap>
        <p>conversations between me and the universe</p>

        <LinkRow>
          <li><a href="/i+o">latest</a></li>
          <li><a href="/i+o/search">search</a></li>
          <li><a href="/i+o/random">random</a></li>
          <li><a href="/i+o?page=0">start</a></li>

          <li><a href="/i+o/respond" class="special">respond</a></li>
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

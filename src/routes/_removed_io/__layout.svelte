<script lang="ts">
  import { goto } from '$app/navigation';

  import { page } from '$app/stores';
  import BackButton from '$lib/components/BackButton.svelte';
  import LinkRow from '$lib/components/LinkRow.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';
  import QaHeader from './_lib/IOHeader.svelte';
  import RandomizeLink from './_lib/RandomizeLink.svelte';
</script>

<ThemeRoot
  background={palette.grey[900]}
  accent={palette.yellow[800]}
  linkColor={palette.cyan[300]}>
  <Paper marginTop={2}>
    <BackButton
      position="off-center-right"
      href={$page.url.pathname === '/io' ? '/' : '/io'}
      text={$page.url.pathname === '/io' ? 'go home' : 'all messages'} />
    <flex>
      <QaHeader />
      <flex gap>
        <p>conversations between me and the universe</p>

        <LinkRow>
          <li><a sveltekit:prefetch href="/io">latest</a></li>
          <!-- <li><a sveltekit:prefetch href="/io/search">search</a></li> -->
          <li><RandomizeLink href="/io/random" /></li>
          <li><a sveltekit:prefetch href="/io?page=0">start</a></li>

          <!-- <li><a href="/io/respond" class="special">respond</a></li> -->
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

<script lang="ts">
  import { ThemeRoot } from '$lib';
  import BackButton from 'src/components/BackButton.svelte';
  import Link from 'src/lib/link/Link.svelte';

  export let data: { donators: string[] };
</script>

<ThemeRoot background="#110011" primary="#C622A2" foreground="#eee">
  <layout-container size="medium">
    <BackButton />
    <h1>give me chocolate</h1>
    <ul class="methods">
      <li><Link href="https://paypal.me/davecode">paypal.me/davecode</Link></li>
      <li><Link href="https://patreon.com/paperdave">patreon.com/paperdave</Link></li>
    </ul>
    <p class="thank">thank you to:</p>
    <ul class="donators">
      {#each data.donators as name}
        <li>{name}</li>
      {/each}
    </ul>
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 4rem;
    font-weight: 800;
    margin: 0;
    @include shadow(#c622a2, 4);
  }
  .methods {
    padding-left: 0;
    li {
      list-style-type: none;
      text-align: right;
      margin-bottom: 4px;
    }
  }
  .donators {
    padding-left: 15%;
    li {
      list-style-type: '- ';
    }
  }
  .thank,
  .donators {
    font-size: 1.25rem;
    color: #999;
  }
</style>

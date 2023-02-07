<script lang="ts">
  import BackButton from 'src/components/BackButton.svelte';
  import Link from 'src/lib/link/Link.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';

  export let data: { donators: string[] };
</script>

<ThemeRoot background="#110011" primary="#C622A2" foreground="#eee">
  <layout-container size="medium">
    <BackButton />
    <h1>give me chocolate</h1>
    <p>free art is great. know what's better? free chocolate.</p>
    <p>
      unfortuantly, whoever created earth forgot to make chocolate free. if i was at the board of
      directors of earth, i would've totally made that stuff free for everyone. but we're here.
    </p>
    <p>
      and unfortuantly, making free art doesn't give out much money. in fact, it actually costs
      money. who'd've thought?
    </p>
    <p>
      so after i spend hours and hours of work on my art, there isn't any free chocolate at the end.
    </p>
    <p>
      that's your job. give me chocolate. that's the deal. i make art free for all; you make
      chocolate free for me. well for everyone else too, but me first please.
    </p>
    <p>
      actually, buy yourself chocolate too. do that first. you deserve it, i'm sure of it. but then
      immediately after you got yourself a stable supply of chocolate, get me some too.
    </p>
    <p>
      i think if everyone had free access to chocolate, i think the world would be a better place.
      one without war. and definetly no hunger ... since we'd have the chocolate.
    </p>
    <p>thanks. i love you. and your chocolate. but mostly you &lt;3</p>
    <ul class="methods">
      <li><Link href="https://ko-fi.com/paperdave">ko-fi.com/paperdave</Link></li>
      <li><Link href="https://paypal.me/paperdave">paypal.me/paperdave</Link></li>
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

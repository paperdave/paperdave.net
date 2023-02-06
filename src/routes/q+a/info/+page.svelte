<script lang="ts">
  import Button from 'src/lib/input-button/Button.svelte';
  import Link from 'src/lib/link/Link.svelte';

  let trackingData: any | null = null;
  let loadingTrack = false;
  async function track() {
    loadingTrack = true;
    trackingData = await fetch('/q+a/api/example-track').then((r) => r.json());
  }
</script>

<h1>info and privacy policy</h1>

<h2>rules</h2>

<ul>
  <li>be reasonable</li>
</ul>

<h2>what i store</h2>

<p>i store</p>

<ul>
  <li>all the text that is in the box and press send on. obviously</li>
  <li>email if you put it in</li>
  <li>which country you're in</li>
  <li>a random generated name based off your ip address</li>
  <li>if you are using a vpn or similar service</li>
</ul>

<p>
  the last three are used for bans and potential rate limits, as i've had some extremely horrible
  experiences in the past with certain people so this measure is kind of a safety net for myself.
  it's also fun to see that not every question is coming from the same person, and that i'm not
  alone on earth.
</p>

<p>
  emails are used to send the notification email, nothing else. they're deleted after the question
  is answered/denied with the other data.
</p>

<p>
  if you're curious how it works the submit endpoint works <Link
    href="https://github.com/paperdave/paperdave.net/blob/main/src/routes/q%2Ba/api/submit/%2Bserver.ts"
    >like this</Link
  >.
</p>

<h2>sharing with proxycheck.io</h2>

<p>
  i use <Link href="https://proxycheck.io/">proxycheck.io</Link> for vpn detection. for now, no action
  is taken on just using a vpn/proxy alone, but what they consider "threats" are fully blocked by the
  question submit endpoint (risk > 72).
</p>

<h2>tracking example</h2>

{#if trackingData}
  <p>if you're curious what your random name is:</p>
  <pre>{JSON.stringify(trackingData, null, 2)}</pre>
{:else}
  <p>if you're curious what your random name is you can click this button.</p>
  <Button on:click={track} disabled={loadingTrack}>
    {#if loadingTrack}
      loading...
    {:else}
      view
    {/if}
  </Button>
{/if}

<h2>deleting questions</h2>

<p>i do not take question delete requests. i still love you though.</p>

<style lang="scss">
  pre {
    background: #000;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  ul {
    list-style: '- ';
    padding-left: 1.5rem;
  }
</style>

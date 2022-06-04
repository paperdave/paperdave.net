<script lang="ts">
  import type { Donator } from '@prisma/client';
  import BackButton from '$lib/components/BackButton.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import Paper from '$lib/components/Paper.svelte';

  export let hallOfFame: Donator[];
</script>

<Meta title="give me chocolate" description="donation page" />

<ThemeRoot background="#9c8772" accent="#F77D0A">
  <Paper>
    <BackButton position="off-center" />
    <h1>i like chocolate</h1>
    <p>
      chocolate is awesome. in fact, the entire davecode creative dream is powered by the sweet
      taste of chocolate. i give all my art out for free, paid for by myself. if you want to help
      funding, which i probably will just waste on chocolate, you can donate here:
    </p>

    <div class="donate-box">
      <a href="https://patreon.com/davecaruso">patreon</a>
      | <a href="https://paypal.me/davecode">paypal</a>
    </div>

    <p>thank you</p>

    <h2>donator hall of fame</h2>
    <ul>
      {#each hallOfFame as donator}
        <li>{donator.name}</li>
      {/each}
      <li class="other">and other anonymous people</li>
    </ul>
  </Paper>
</ThemeRoot>

<style lang="scss">
  .donate-box {
    margin: 5rem auto;
    max-width: 600px;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
  }
  h1 {
    margin-top: 2rem;
    text-align: center;
  }
  h2 {
    margin-top: 5rem;
    text-align: center;
  }
  li {
    text-align: center;
  }
  .other {
    opacity: 0.5;
  }
</style>

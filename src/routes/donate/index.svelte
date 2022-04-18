<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';

  const hardcodedData = [
    {
      name: 'Filip Kin',
      amount: -1,
    },
    {
      name: 'Egrodo',
      amount: -1,
    },
    {
      name: 'Aya',
      amount: -1,
    },
  ];
</script>

<ThemeRoot background="#9c8772" accent="#F77D0A">
  <main>
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
      {#each hardcodedData as dontation}
        <li>{dontation.name}</li>
      {/each}
      <li class="other">and other anonymous people</li>
    </ul>
  </main>
</ThemeRoot>

<style lang="scss">
  main {
    flex: 1;
  }
  p {
    margin: auto;
    max-width: 600px;
  }
  .donate-box {
    margin: 5rem auto;
    max-width: 600px;
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
  }
  h1 {
    text-align: center;
    margin-top: 2rem;
  }
  h2 {
    text-align: center;
    margin-top: 5rem;
  }
  li {
    text-align: center;
  }
  .other {
    opacity: 0.5;
  }
</style>

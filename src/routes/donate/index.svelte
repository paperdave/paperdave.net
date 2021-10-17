<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
</script>

<main>
  <BackButton position="off-center" />
  <h1>i like chocolate</h1>
  <p>
    chocolate is awesome. in fact, the entire davecode creative dream is powered by the sweet taste
    of chocolate. i give all my art out for free, paid for by myself. if you want to help funding,
    which i probably will just waste on chocolate, you can donate here:
  </p>

  <div class="donate-box">
    <a href="https://patreon.com/davecaruso">patreon</a>
    | <a href="https://paypal.me/davecode">paypal</a>
  </div>

  <p>thank you</p>

  <h2>donator hall of fame</h2>
  <ul>
    <li>Filip Kin</li>
    <li>egrodo</li>
    <li>and other anonymous people</li>
  </ul>
</main>

<style lang="scss">
  main {
    background-color: #b3e6ff;
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
    a {
      &:hover {
        text-decoration: underline;
      }
      &:active {
        color: #ff0000;
      }
    }
  }
  h1 {
    text-align: center;
    margin-top: 2rem;
  }
  h2 {
    text-align: center;
  }
  li {
    text-align: center;
  }
</style>

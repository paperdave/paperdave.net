<script lang="ts">
  import yaml from './credits.yaml';
</script>

<main>
  <h1>special thanks &lt;3</h1>
  <p>these dear friends have made this creative dream possible:</p>
  <ul>
    {#each yaml.special_thanks as credit, i}
      <li style="transform:translateX({(yaml.baked_rng[i] - 0.5) * 200}px)">
        {credit}
      </li>
    {/each}
  </ul>
  <p>friendship is part of the key to creativity.</p>
</main>

<style lang="scss">
  main {
    margin: 2rem 0;
  }
  h1 {
    text-align: center;
    color: #e089c8;
    text-shadow: shadow(3px, 1, #edb9dd);
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.5rem;
    text-align: center;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
  }
  li {
    font-size: 1.5rem;
    line-height: 0.9;
    margin: 0 auto;
    text-align: center;
    width: fit-content;
    color: #9a008a;
  }
</style>

<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
  import yaml from './credits.yaml';
</script>

<main>
  <BackButton position="off-center" />
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
  <hr />
  <p>
    As for technicals, i owe a lot of thanks to software by Microsoft, Google, and Blackmagic
    Design. Hardware thanks to AMD, Nvidia, Intel, Dell, Sceptre, Logitech. Application thanks to
    the people behind Node.JS, Svelte, Blender, Figma, and many many more.
  </p>
  <hr />
  <p />
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
    margin: auto;
    max-width: 800px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 2rem auto;
  }
  li {
    font-size: 1.5rem;
    line-height: 1.1;
    margin: 0 auto;
    text-align: center;
    width: fit-content;
    color: #9a008a;
  }
  hr {
    border: none;
    height: 10rem;
  }
</style>

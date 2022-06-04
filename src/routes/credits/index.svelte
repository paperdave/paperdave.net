<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import yaml from './credits.yaml';
</script>

<Meta title="credits" />

<ThemeRoot accent="#e089c8">
  <Paper marginTop>
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
  </Paper>
</ThemeRoot>

<style lang="scss">
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

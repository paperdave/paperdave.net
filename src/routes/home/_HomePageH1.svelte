<script>
  import HomePageTitleChar from './_HomePageTitleChar.svelte';
  import PlaneSVG from '$lib/svg/brand/Plane.svg';

  let titleOrder = 'Davecode';
  const titleColors = {
    D: '#007205',
    a: '#006004',
    v: '#006004',
    e: '#007205',
    c: '#007205',
    o: '#329437',
    d: '#720DA1',
  };
</script>

<h1>
  {#each titleOrder as char}
    <HomePageTitleChar color={titleColors[char]}>
      {char.toLowerCase()}
    </HomePageTitleChar>
  {/each}
  <div class="svg-container">
    <PlaneSVG />
  </div>
</h1>

<style lang="scss">
  h1 {
    position: relative;
  }

  h1 :global(svg) {
    fill: #004202;
    width: 6rem;
  }

  .svg-container {
    display: inline-flex;
    align-items: center;
    margin-left: 1rem;
  }
</style>

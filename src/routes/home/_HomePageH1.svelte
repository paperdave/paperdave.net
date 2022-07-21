<script lang="ts">
  import HomePageTitleChar from './_HomePageTitleChar.svelte';
  import PlaneSVG from '$lib/svg/brand/Plane.svg';

  let titleOrder = 'PApErdave';
  const titleColors: Record<string, string> = {
    P: '#007205',
    A: '#006004',
    p: '#006004',
    E: '#007205',
    r: '#329437',
    d: '#006004',
    a: '#007205',
    v: '#720DA1',
    e: '#329437',
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
    margin-bottom: 0.75rem;
  }

  h1 :global(svg) {
    fill: #004202;
    width: 5rem;

    @media (max-width: 800px) {
      width: 10vw;
    }
  }

  .svg-container {
    display: inline-flex;
    align-items: center;
    margin-left: 1rem;

    @media (max-width: 800px) {
      margin-left: 0;
    }
  }
</style>

<script context="module" lang="ts">
  export type PaperSize = 'small' | 'medium' | 'standard' | 'large' | 'xl';
</script>

<script lang="ts">
  export let size: PaperSize = 'standard';
  export let marginTop: boolean | number = false;
</script>

<div>
  <grid
    center
    class="size-{size}"
    style:margin-top={marginTop
      ? `${typeof marginTop === 'number' ? marginTop : 1}rem`
      : undefined}>
    <slot />
  </grid>
</div>

<style lang="scss">
  grid {
    display: grid;
    position: relative;
    grid-template-columns: 1fr 2rem min(var(--size), calc(100vw - 4rem)) 2rem 1fr;
    row-gap: 1rem;
    & > :global(*) {
      grid-column: 3;
    }
    & > :global(.full-bleed),
    & > :global(img:not(.custom)),
    & > :global(figure:not(.custom)) {
      grid-column: 2 / 5;
    }
  }

  .size-small {
    --size: 20rem;
  }
  .size-medium {
    --size: 30rem;
  }
  .size-standard {
    --size: 45rem;
  }
  .size-large {
    --size: 60rem;
  }
  .size-xl {
    --size: 80rem;
  }
</style>

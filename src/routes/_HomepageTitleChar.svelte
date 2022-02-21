<script lang="ts">
  import Color from 'color';
  export let color = '#ff0000';
  let colorDarkened = new Color(color).darken(0.3).desaturate(0.2).hex();
</script>

<span style="color:{color};--drop:{colorDarkened}">
  <slot />
</span>

<style lang="scss">
  span {
    display: inline-block;
    font-family: 'Roboto Slab', sans-serif;
    font-size: 8rem;
    font-weight: bold;
    text-shadow: shadow(6px, 1, var(--drop));
    user-select: none;
    line-height: 1;

    transform: translateY(0);
    transition: transform 350ms cubic-bezier(0.2, 0.3, 0, 1.5);
    &:hover {
      transform: translateY(-2px);
      transition: transform 250ms cubic-bezier(0.2, 0, 0, 1);
    }
  }
</style>

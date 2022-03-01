<script>
  function range(start, end, step = 1) {
    let a = [];
    for (let i = start; i <= end; i += step) {
      a.push(i);
    }
    return a;
  }
</script>

<globe>
  <div class="circle" />

  <div class="hlines">
    {#each range(-80, 80, 20) as i}
      <svg
        width="512"
        height="256"
        viewBox="0 0 512 256"
        style="--a:{Math.abs(i + 0.01)}%"
        class:invert={i < 0}>
        <ellipse cx="256" cy="1" rx="254" ry="254" stroke-width="2" />
      </svg>
    {/each}
  </div>
  <div class="vlines">
    {#each range(-80, 100, 20) as i}
      <svg
        width="512"
        height="256"
        viewBox="0 0 512 256"
        style="--a:{Math.abs(i + 0.01)}%"
        class:invert={i <= 0}>
        <ellipse cx="256" cy="1" rx="254" ry="254" stroke-width="2" />
      </svg>
    {/each}
  </div>
</globe>

<style lang="scss">
  globe {
    display: block;
    flex: 1;
    height: 100%;
    position: relative;
    transform: rotate(-2deg);
    border-radius: 50%;
  }

  .absfill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .circle {
    @extend .absfill;
    border: 3px solid black;
    border-radius: 50%;
  }

  .hlines {
    @extend .absfill;
  }

  .vlines {
    @extend .absfill;
    transform: rotate(90deg);
  }

  svg {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 50%;
    --move: 20%;
  }

  ellipse {
    fill: none;
    stroke: hsl(var(--foreground));
    // this is said to be an unknown css property, but it is valid
    ry: var(--a);
  }

  .invert {
    transform-origin: 50% 0;
    transform: scaleY(-1);
    --move: -20%;
  }

  .vlines ellipse {
    animation: vlines 1s infinite linear;
  }

  @keyframes vlines {
    0% {
      ry: var(--a);
    }
    100% {
      ry: calc(var(--a) - var(--move));
    }
  }
</style>

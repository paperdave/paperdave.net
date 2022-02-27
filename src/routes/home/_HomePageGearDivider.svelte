<script lang="ts">
  import { browser } from '$app/env';

  import { gearRotations } from './homepage-stores';

  const gearPositions = [
    {
      x: 2.5,
      y: 0,
      angle: 13,
      size: 16,
    },
    {
      x: 18,
      y: 1,
      angle: 11.5,
      size: 11,
      invert: true,
    },
    {
      x: 28.2,
      y: -1,
      angle: -17,
      size: 11,
    },
    {
      x: 38.5,
      y: -0.5,
      angle: 6,
      size: 11,
      invert: true,
    },
    {
      x: 48.5,
      y: -0.5,
      angle: 11,
      size: 11,
    },
    {
      x: 58.7,
      y: -0.2,
      angle: 9,
      size: 11,
      invert: true,
    },
    {
      x: 69,
      y: -0.5,
      angle: 5,
      size: 11,
    },
    {
      x: 79.2,
      y: 0.5,
      angle: -10,
      size: 14,
      invert: true,
    },
  ];
</script>

<main>
  <div class="background" />
  {#each gearPositions as gear}
    <gear
      style="--width:{gear.size}rem;--x:{gear.x}rem;--y:{gear.y}rem;--angle:{gear.angle ?? 0}deg">
      <div class="spin" class:invert={gear.invert}>
        {#if browser}
          <div
            class="spin2"
            style="transform:rotate({$gearRotations * 120 * (gear.invert ? -1 : 1)}deg)">
            <div class="img" />
          </div>
        {:else}
          <div class="img" />
        {/if}
      </div>
    </gear>
  {/each}
</main>

<style lang="scss">
  main {
    position: absolute;
    top: 0;
    left: -20rem;
    width: calc(100% + 20rem);
    height: 100%;
    z-index: 40;
    transform: translate(0, -50%);
    clip-path: polygon(calc(19rem - 1px) 0, 100% 0, 100% 100%, 2rem 100%);
    pointer-events: none;
  }

  .background {
    background: linear-gradient(#4cc5ff 0%, #f5f5f5 50%, #fff599 100%);
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2rem;
  }

  gear {
    display: flex;
    position: absolute;
    top: calc(50% + var(--y) - var(--width) / 2);
    left: var(--x);
    transform: rotate(var(--angle));

    &,
    & .img {
      width: var(--width);
      height: var(--width);
    }
  }

  .img {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMTU2IiB5PSIxNTYiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOEY4RjhGIi8+PHBhdGggZD0iTTIyNS45MDYgNDYuOTQ5OEwyMzIuNzYxIDQ1Ljk1NzhWMzkuMDMyM1Y5LjA5ODE5QzI0OC4yMiA3LjYzMzk0IDI2My43OCA3LjYzMzk0IDI3OS4yMzkgOS4wOTgxOVYzOS4wMzIzVjQ1Ljk1NzhMMjg2LjA5NCA0Ni45NDk4QzMwNi4wNTMgNDkuODM4MyAzMjUuNSA1NS41ODU3IDM0My44NDUgNjQuMDE4MUwzNTAuMTc4IDY2LjkyOTJMMzUzLjkyOSA2MS4wNTQ2TDM2OS45NzYgMzUuOTIxNEMzODMuNzc1IDQzLjEwNzggMzk2Ljg3MiA1MS41ODI5IDQwOS4wOTcgNjEuMjM2MUwzOTMuMDAzIDg2LjQ0MDNMMzg5LjI5NSA5Mi4yNDY3TDM5NC40ODcgOTYuNzc0OEM0MDkuNzMyIDExMC4wNzEgNDIzLjAxMSAxMjUuNDkzIDQzMy45MTggMTQyLjU3NUw0MzcuNjY5IDE0OC40NUw0NDQuMDAyIDE0NS41MzlMNDcwLjk4MSAxMzMuMTM4QzQ3OC43NCAxNDYuNzA3IDQ4NS4yMTQgMTYwLjk4IDQ5MC4zMTggMTc1Ljc3MUw0NjMuMjc0IDE4OC4yMDJMNDU3LjAwMiAxOTEuMDg1TDQ1OC45MzUgMTk3LjcxMkM0NjQuNjIgMjE3LjE5OCA0NjcuNTA3IDIzNy40MDMgNDY3LjUwNyAyNTcuNzE0VjI2NC42NEw0NzQuMzYxIDI2NS42MzJMNTAzLjc1OSAyNjkuODg2QzUwMyAyODUuNTI5IDUwMC43ODIgMzAxLjA2NiA0OTcuMTMyIDMxNi4yOUw0NjcuNzYxIDMxMi4wNEw0NjAuODgyIDMxMS4wNDRMNDU4LjkzNSAzMTcuNzE3QzQ1My4yNTEgMzM3LjIwMyA0NDQuODI1IDM1NS43NyA0MzMuOTE4IDM3Mi44NTNMNDMwLjIxMSAzNzguNjZMNDM1LjQwMyAzODMuMTg4TDQ1Ny44OTEgNDAyLjc5OUM0NDguODU5IDQxNS41MzYgNDM4LjY1NyA0MjcuMzkgNDI3LjQyMyA0MzguMjA0TDQwNS4wMDQgNDE4LjY1MkwzOTkuNzQ1IDQxNC4wNjZMMzk0LjQ4NyA0MTguNjUzQzM3OS4yNDQgNDMxLjk0OCAzNjIuMTkgNDQyLjk3OCAzNDMuODQ1IDQ1MS40MUwzMzcuNTczIDQ1NC4yOTNMMzM5LjUwNiA0NjAuOTJMMzQ3Ljg5MSA0ODkuNjYyQzMzMy40NjcgNDk1LjQ1MyAzMTguNTM0IDQ5OS44NjggMzAzLjI5IDUwMi44NDhMMjk0LjkxOSA0NzQuMTU1TDI5Mi45NzMgNDY3LjQ4MkwyODYuMDk0IDQ2OC40NzhDMjY2LjEzMyA0NzEuMzY2IDI0NS44NjcgNDcxLjM2NiAyMjUuOTA2IDQ2OC40NzhMMjE5LjAyNyA0NjcuNDgyTDIxNy4wODEgNDc0LjE1NUwyMDguNzEgNTAyLjg0OEMxOTMuNDY2IDQ5OS44NjggMTc4LjUzMyA0OTUuNDUzIDE2NC4xMDggNDg5LjY2MkwxNzIuNDkzIDQ2MC45MkwxNzQuNDI2IDQ1NC4yOTNMMTY4LjE1NCA0NTEuNDFDMTQ5LjgxIDQ0Mi45NzggMTMyLjc1NiA0MzEuOTQ4IDExNy41MTIgNDE4LjY1M0wxMTIuMjUzIDQxNC4wNjdMMTA2Ljk5NSA0MTguNjUyTDg0LjU3NjkgNDM4LjIwNEM3My4zNDE5IDQyNy4zOSA2My4xNDEgNDE1LjUzNyA1NC4xMDkzIDQwMi43OTlMNzYuNTk3MyAzODMuMTg4TDgxLjc4OTMgMzc4LjY2TDc4LjA4MiAzNzIuODUzQzY3LjE3NDUgMzU1Ljc3IDU4Ljc0OTUgMzM3LjIwMyA1My4wNjQ5IDMxNy43MTdMNTEuMTE4MyAzMTEuMDQ0TDQ0LjIzOTMgMzEyLjA0TDE0Ljg2NzcgMzE2LjI5QzExLjIxODIgMzAxLjA2NiA4Ljk5OTkyIDI4NS41MjkgOC4yNDEyNyAyNjkuODg2TDM3LjYzODYgMjY1LjYzMkw0NC40OTI5IDI2NC42NFYyNTcuNzE0QzQ0LjQ5MjkgMjM3LjQwMyA0Ny4zODAxIDIxNy4xOTggNTMuMDY0OSAxOTcuNzEyTDU0Ljk5NzkgMTkxLjA4NUw0OC43MjYyIDE4OC4yMDJMMjEuNjgxOSAxNzUuNzcxQzI2Ljc4NjEgMTYwLjk4MSAzMy4yNiAxNDYuNzA3IDQxLjAxODIgMTMzLjEzOEw2Ny45OTgxIDE0NS41MzlMNzQuMzMxIDE0OC40NUw3OC4wODE5IDE0Mi41NzVDODguOTg5MSAxMjUuNDkzIDEwMi4yNjggMTEwLjA3MSAxMTcuNTEyIDk2Ljc3NDZMMTIyLjcwMyA5Mi4yNDY1TDExOC45OTYgODYuNDQwM0wxMDIuOTAyIDYxLjIzNjJDMTE1LjEyNyA1MS41ODI4IDEyOC4yMjUgNDMuMTA3NyAxNDIuMDI0IDM1LjkyMTNMMTU4LjA3MSA2MS4wNTQ2TDE2MS44MjIgNjYuOTI5MkwxNjguMTU1IDY0LjAxODFDMTg2LjUgNTUuNTg1NyAyMDUuOTQ3IDQ5LjgzODMgMjI1LjkwNiA0Ni45NDk4Wk0zNDMuNjA4IDI1Ny43MTRDMzQzLjYwOCAyMDkuMTIzIDMwNC40MDMgMTY5LjU5IDI1NS45OTkgMTY5LjU5QzIwNy41OTYgMTY5LjU5IDE2OC4zOTIgMjA5LjEyMyAxNjguMzkyIDI1Ny43MTRDMTY4LjM5MiAzMDYuMzA1IDIwNy41OTYgMzQ1LjgzOCAyNTUuOTk5IDM0NS44MzhDMzA0LjQwMyAzNDUuODM4IDM0My42MDggMzA2LjMwNSAzNDMuNjA4IDI1Ny43MTRaIiBmaWxsPSIjNjE2MTYxIiBzdHJva2U9IiMzMDMwMzAiIHN0cm9rZS13aWR0aD0iMTYiLz48L3N2Zz4NCg==);
    background-size: contain;
  }

  .spin {
    animation: spin infinite linear 25s;
    --spin: 360deg;

    &.invert {
      --spin: -360deg;
    }
  }

  .spin2 {
    transition: transform 1.5s cubic-bezier(0.2, 0.3, 0.1, 1);
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(var(--spin));
    }
  }
</style>

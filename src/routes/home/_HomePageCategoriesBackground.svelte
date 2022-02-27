<script lang="ts">
  import { browser } from '$app/env';
  import { gearRotations } from './homepage-stores';

  const gearPositions = [
    {
      align: 'bottom',
      x: -6,
      y: -10,
      size: 32,
    },
    {
      align: 'bottom',
      x: 22.7,
      y: -19.4,
      angle: 20,
      invert: true,
      size: 32,
    },
    {
      align: 'bottom',
      x: 52.7,
      y: -15,
      angle: 12.5,
      size: 32,
    },
    {
      align: 'top',
      x: 30,
      y: -35,
      angle: 12.5,
      size: 48,
    },
  ];
</script>

<main>
  {#each gearPositions as gear}
    <gear
      style="--width:{gear.size}rem;--x:{gear.x}rem;--y:{gear.y}rem;--angle:{gear.angle ?? 0}deg"
      align={gear.align}>
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
    left: 0;
    width: 100%;
    height: 100%;
  }

  gear {
    display: flex;
    position: absolute;
    left: var(--x);
    transform: rotate(var(--angle));

    &,
    & .img {
      width: var(--width);
      height: var(--width);
    }

    &[align='bottom'] {
      bottom: var(--y);
    }
    &[align='top'] {
      top: var(--y);
    }
  }

  .img {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjg3LjIzOSAxLjkyNDk3QzI2Ni40OTEgLTAuNjQxNjU2IDI0NS41MDkgLTAuNjQxNjU2IDIyNC43NjEgMS45MjQ5N1YzOS4wMzIzQzIwNC4wNDIgNDIuMDMwNyAxODMuODU1IDQ3Ljk5NjkgMTY0LjgxNCA1Ni43NDkzTDE0NC44ODIgMjUuNTMxOEMxMjYuMDQ3IDM0LjY2MyAxMDguMzk3IDQ2LjA3OTYgOTIuMzIwNyA1OS41MjkyTDExMi4yNTMgOTAuNzQ1N0M5Ni40MzQxIDEwNC41NDMgODIuNjU1OSAxMjAuNTQ3IDcxLjMzOTIgMTM4LjI3TDM3LjgwMjIgMTIyLjg1NkMyNi44NjM5IDE0MC43ODQgMTguMTQ3OSAxNTkuOTk0IDExLjg0ODEgMTgwLjA1Nkw0NS4zODUgMTk1LjQ3MUMzOS40ODc4IDIxNS42ODYgMzYuNDkyOSAyMzYuNjQ1IDM2LjQ5MjkgMjU3LjcxNEwwIDI2Mi45OTVDMC40MjkwNTUgMjg0LjAzMSAzLjQxNDUzIDMwNC45MzMgOC44OTIxIDMyNS4yMzhMNDUuMzg1IDMxOS45NTdDNTEuMjgyMSAzNDAuMTcyIDYwLjAyMjQgMzU5LjQzNCA3MS4zMzkyIDM3Ny4xNThMNDMuNDc1OSA0MDEuNDU4QzU1LjEzNTIgNDE4LjkyMSA2OC44NzU1IDQzNC44ODEgODQuMzkgNDQ4Ljk4MkwxMTIuMjUzIDQyNC42ODJDMTI4LjA3NCA0MzguNDc5IDE0NS43NzIgNDQ5LjkyNyAxNjQuODEzIDQ1OC42NzlMMTU0LjQyNiA0OTQuMjg0QzE3My42MTYgNTAyLjYzIDE5My43NDcgNTA4LjU3OSAyMTQuMzc0IDUxMkwyMjQuNzYxIDQ3Ni4zOTVDMjQ1LjQ4MSA0NzkuMzk0IDI2Ni41MTkgNDc5LjM5NCAyODcuMjM5IDQ3Ni4zOTVMMjk3LjYyNiA1MTJDMzE4LjI1MSA1MDguNTc5IDMzOC4zODQgNTAyLjYzIDM1Ny41NzMgNDk0LjI4NEwzNDcuMTg2IDQ1OC42NzlDMzY2LjIyNyA0NDkuOTI3IDM4My45MjYgNDM4LjQ3OSAzOTkuNzQ2IDQyNC42ODJMNDI3LjYxIDQ0OC45ODJDNDQzLjEyMyA0MzQuODgxIDQ1Ni44NjUgNDE4LjkyMSA0NjguNTI0IDQwMS40NThMNDQwLjY2MSAzNzcuMTU4QzQ1MS45NzggMzU5LjQzNCA0NjAuNzE4IDM0MC4xNzIgNDY2LjYxNSAzMTkuOTU3TDUwMy4xMDggMzI1LjIzOEM1MDguNTg2IDMwNC45MzMgNTExLjU3MSAyODQuMDMxIDUxMiAyNjIuOTk1TDQ3NS41MDcgMjU3LjcxNEM0NzUuNTA3IDIzNi42NDUgNDcyLjUxMiAyMTUuNjg2IDQ2Ni42MTUgMTk1LjQ3MUw1MDAuMTUyIDE4MC4wNTZDNDkzLjg1MiAxNTkuOTk0IDQ4NS4xMzYgMTQwLjc4NCA0NzQuMTk3IDEyMi44NTZMNDQwLjY2MSAxMzguMjdDNDI5LjM0NCAxMjAuNTQ3IDQxNS41NjYgMTA0LjU0MyAzOTkuNzQ2IDkwLjc0NTdMNDE5LjY3OCA1OS41MjkyQzQwMy42MDMgNDYuMDc5NiAzODUuOTUyIDM0LjY2MyAzNjcuMTE4IDI1LjUzMThMMzQ3LjE4NiA1Ni43NDkzQzMyOC4xNDUgNDcuOTk2OSAzMDcuOTU4IDQyLjAzMDcgMjg3LjIzOSAzOS4wMzIzVjEuOTI0OTdaTTI1NS45OTkgMTc3LjU5QzI5OS45MzYgMTc3LjU5IDMzNS42MDggMjEzLjQ5MyAzMzUuNjA4IDI1Ny43MTRDMzM1LjYwOCAzMDEuOTM2IDI5OS45MzYgMzM3LjgzOCAyNTUuOTk5IDMzNy44MzhDMjEyLjA2MyAzMzcuODM4IDE3Ni4zOTIgMzAxLjkzNiAxNzYuMzkyIDI1Ny43MTRDMTc2LjM5MiAyMTMuNDkzIDIxMi4wNjMgMTc3LjU5IDI1NS45OTkgMTc3LjU5WiIgZmlsbD0iI0ZCRTA4NCIvPjwvc3ZnPg==);
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

<script lang="ts">
  import Color from 'color';
  import { onDestroy } from 'svelte';
  import { topZIndex, hasMovedLetter } from './homepage-stores';

  export let color = '#ff0000';

  let colorDarkened = new Color(color).darken(0.5).saturate(0.5).hex();

  let floating: HTMLElement | null = null;
  let active = false;
  let floatingX = 0;
  let floatingY = 0;

  function onMouseDown(ev: Event) {
    $hasMovedLetter = true;

    const node = ev.target as HTMLElement;

    active = true;
    floating = document.createElement('div');
    floating.className = 'floating-word-magnet';
    floating.style.color = color;
    floating.style.setProperty('--drop', colorDarkened);

    const shadow = document.createElement('div');
    shadow.innerText = node.innerText;
    shadow.classList.add('shadow');
    floating.appendChild(shadow);

    const innerFloating = document.createElement('div');
    innerFloating.innerText = node.innerText;
    innerFloating.classList.add('transform-root');
    floating.appendChild(innerFloating);

    const bounds = node.getBoundingClientRect();
    floatingX = bounds.x + document.scrollingElement!.scrollLeft;
    floatingY = bounds.y + document.scrollingElement!.scrollTop;

    floating.style.zIndex = String($topZIndex++);

    updateFloating();
    document.body.appendChild(floating);

    setTimeout(() => {
      floating?.classList.add('held');
    }, 10);

    window.addEventListener('mouseup', floatingMouseUp);
    window.addEventListener('mousemove', floatingMouseMove);

    floating.addEventListener('mousedown', () => {
      window.addEventListener('mouseup', floatingMouseUp);
      window.addEventListener('mousemove', floatingMouseMove);
      floating!.classList.add('held');
      floating!.style.zIndex = String($topZIndex++);
    });
  }

  function floatingMouseMove(ev: MouseEvent) {
    floatingX += ev.movementX;
    floatingY += ev.movementY;
    updateFloating();
  }

  function floatingMouseUp(ev: MouseEvent) {
    floatingMouseMove(ev);
    window.removeEventListener('mouseup', floatingMouseUp);
    window.removeEventListener('mousemove', floatingMouseMove);
    floating!.classList.remove('held');
  }

  function updateFloating() {
    floating!.style.transform = `translate(${floatingX}px, ${floatingY}px)`;
  }

  onDestroy(() => {
    if (floating) {
      floating.remove();
      floating = null;
    }
  });
</script>

<span
  style="color:{color};--drop:{colorDarkened}"
  on:mousedown={onMouseDown}
  class:active
  class:noHint={$hasMovedLetter}>
  <slot />
</span>

<style lang="scss">
  span,
  :global(.floating-word-magnet) {
    font-weight: bold;
    font-size: 8rem;
    line-height: 1;
    font-family: 'Roboto Slab', sans-serif;
    user-select: none;
    text-shadow: shadow(6px, 1, var(--drop));

    @media (max-width: 800px) {
      font-size: 15vw;
      text-shadow: shadow(3px, 1, var(--drop));
    }
  }

  span {
    display: inline-block;

    transform: translateY(0);
    transition: transform 350ms cubic-bezier(0.2, 0.3, 0, 1.5);

    &:not(.noHint):hover {
      transform: translateY(-8px);
      transition: transform 250ms cubic-bezier(0.2, 0, 0, 1);
    }

    &.active {
      visibility: hidden;
      pointer-events: none;
    }
  }

  :global {
    .floating-word-magnet {
      position: absolute;
      top: 0;
      left: 0;

      transform: translate(-3px, -10px);

      .transform-root {
        position: absolute;
        transition: transform 300ms cubic-bezier(0.2, 0, 0, 1);
      }

      .shadow {
        position: absolute;
        transform: translate(6px, 6px);
        color: hsla(var(--fg), 0.3);
        text-shadow: none;
      }

      &.held .transform-root {
        transform: translate(0px, -10px);
      }
    }
  }
</style>

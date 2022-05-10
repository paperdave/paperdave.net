<nav>
  <ul>
    <slot />
  </ul>
</nav>

<style lang="scss">
  ul {
    display: flex;
    position: relative;
    align-items: center;
    gap: 1rem;

    & > :global(*:not(:first-child)::before) {
      display: inline-block;
      position: absolute;
      transform: translate(-0.5rem);
      background-color: hsla(var(--fg), 0.7);
      width: 2px;
      height: 100%;
      content: ' ';
    }
  }
</style>

<span class="oob-text">
  <a class="custom" href="https://github.com/davecaruso/davecode.net/tree/main/src/global.scss#L17">
    why do you have such a high-res screen???
  </a>
</span>

<style lang="scss">
  .oob-text {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    transform: rotate(-90deg);
    transform-origin: top right;
    z-index: 1337;

    a {
      color: white;
      &:hover {
        color: red;
      }
    }
  }

  @media (min-width: 3880px) {
    .oob-text {
      display: block;
    }
  }
</style>

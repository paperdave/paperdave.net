<div class="root">
  <div class="layer layer1" />
  <div class="layer layer3" />
  <div class="layer layer2" />

  <div class="item tree1" style="--x:21rem" />
  <div class="item tree2" style="--x:38rem;width:12rem" />
  <div class="item tree2" style="--x:-45rem" />
  <div class="item tree1" style="--x:-60rem;width:15rem" />

  <div class="item rock" style="--x:-43rem;width:2rem" />
  <div class="item rock" style="--x:-34rem;width:4rem" />
  <div class="item rock" style="--x:-12rem;width:2rem" />
  <div class="item rock" style="--x:5rem" />
  <div class="item rock" style="--x:30rem;width:2rem" />
  <div class="item rock" style="--x:38rem;width:4rem" />
</div>

<style lang="scss">
  .root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: hsl(var(--bg));
    isolation: isolate; // I heard this can improve performance
  }

  .layer {
    position: absolute;
    top: -256px;
    right: -256px;
    bottom: -256px;
    left: -256px;
  }

  .layer1 {
    --dx: -128px;
    --dy: -64px;
    opacity: 0.4;
    mix-blend-mode: lighten;
    animation: moveAnimation 20s linear infinite;
    background-image: url('/assets/home/CheckerLayer1.svg');
  }

  .layer2 {
    --dx: -256px;
    --dy: -192px;
    opacity: 0.3;
    mix-blend-mode: darken;
    filter: blur(5px);
    animation: moveAnimation 34s linear infinite;
    background-image: url('/assets/home/CheckerLayer2.svg');
    background-position: 16px 16px;
  }

  .layer3 {
    --dx: -192px;
    --dy: 192px;
    opacity: 0.6;
    mix-blend-mode: hard-light;
    filter: blur(4px);
    animation: moveAnimation 25s linear infinite;
    background-image: url('/assets/home/CheckerLayer3.svg');
  }

  @keyframes moveAnimation {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(var(--dx), var(--dy));
    }
  }

  .item {
    position: absolute;
    bottom: 0;
    left: calc(50% + var(--x));
    opacity: 0.9;
    aspect-ratio: 138/266;
    width: 10rem;
  }

  .tree1 {
    background-image: url('/assets/home/Tree1.svg');
  }
  .tree2 {
    background-image: url('/assets/home/Tree2.svg');
  }

  .rock {
    background-image: url('/assets/home/Rock.svg');
    aspect-ratio: 21.78/12.04;
    width: 3rem;
  }
</style>

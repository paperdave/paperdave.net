<script>
  import PlaneSVG from '$lib/svg/brand/Plane.svg';
</script>

<footer>
  <flex center class="plane">
    <PlaneSVG />
  </flex>
  <div class="grow">
    <p>&copy; 2018-2022 All Rights Reserved</p>
    <p>made with <code class="love">&lt;3</code> by dave caruso</p>
  </div>
  <div class="grow" style="text-align:right">
    <!-- <a href="/align-footer" class='custom'>learn how to align a footer</a> -->
  </div>
</footer>

<style lang="scss">
  footer {
    background-color: #101010;
    color: white;
    padding: 2rem 2rem calc(env(safe-area-inset-bottom, 50px) + 2rem) 2rem;
    display: flex;

    a {
      opacity: 0.3;

      &:hover {
        opacity: 0.6;
      }
      &:active {
        opacity: 1;
      }
    }
  }

  .plane {
    margin-right: 1rem;
    & :global(svg) {
      fill: white;
      width: 2.5rem;
    }
  }
  .grow {
    flex: 1;
  }

  .love {
    color: red;
  }
</style>

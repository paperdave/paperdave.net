<script>
  let invert = false;
</script>

<h1 class:invert on:click={() => (invert = !invert)}>
  <span class="answers">answers</span>
  <span class="and">&</span>
  <span class="questions">questions</span>
</h1>

<style lang="scss">
  h1 {
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    margin-bottom: 1rem;
    line-height: 1.15em;
    user-select: none;
    font-weight: 800;
    font-size: 3rem;
    & * {
      display: inline-block;
    }
  }

  .answers {
    color: #ff3a32;
    @include shadow(#8f1004, 2);
  }

  .and {
    position: relative;
    z-index: 10;
    margin: 0 5px;
    color: #f7f7f7;
    @include shadow(#888888, 2);
  }

  .questions {
    color: #faa719;
    @include shadow(#7a471a, 2);
  }

  @media screen and (min-width: 550px) {
    h1 * {
      transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .invert {
      .answers {
        transform: translateX(280px);
      }
      .and {
        transform: translateX(40px);
      }
      .questions {
        transform: translateX(calc(-100%));
      }
    }
  }
</style>

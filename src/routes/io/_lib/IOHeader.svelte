<script>
  let invert = false;
</script>

<h1 class:invert on:click={() => (invert = !invert)}>
  <span class="input">input</span>
  <span class="and">&</span>
  <span class="output">output</span>
</h1>

<style lang="scss">
  h1 {
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    margin-bottom: 1rem;
    line-height: 1.15em;
    user-select: none;
    & * {
      display: inline-block;
    }
  }

  .input {
    color: #ff3a32;
    text-shadow: shadow(2px, 1, #8f1004);
  }

  .and {
    position: relative;
    z-index: 10;
    margin: 0 5px;
    color: #f7f7f7;
    text-shadow: shadow(2px, 1, #888888);
  }

  .output {
    color: #faa719;
    text-shadow: shadow(2px, 1, #7a471a);
  }

  @media screen and (min-width: 489px) {
    h1 * {
      transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .invert {
      .input {
        transform: translateX(228px - 40px);
      }
      .and {
        transform: translateX(-194px + 221px);
      }
      .output {
        transform: translateX(calc(-100% - 10px));
      }
    }
  }
</style>

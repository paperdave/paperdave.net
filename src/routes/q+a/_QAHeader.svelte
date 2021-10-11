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
    line-height: 1.15em;
    margin-bottom: 1rem;
    user-select: none;
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    & * {
      display: inline-block;
    }
  }

  .answers {
    color: #ff3a32;
    text-shadow: shadow(2px, 1, #8f1004);
  }

  .and {
    color: #f7f7f7;
    text-shadow: shadow(2px, 1, #888888);
    margin: 0 5px;
    z-index: 10;
    position: relative;
  }

  .questions {
    color: #faa719;
    text-shadow: shadow(2px, 1, #7a471a);
  }

  @media screen and (min-width: 489px) {
    h1 * {
      transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .invert {
      .questions {
        transform: translateX(-194px - 40px);
      }
      .and {
        transform: translateX(-194px + 221px);
      }
      .answers {
        transform: translateX(221px + 40px);
      }
    }
  }
</style>

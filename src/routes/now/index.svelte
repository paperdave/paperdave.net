<script>
  const things = [
    //
    'doing high school',
    'is rewriting this website in svelte',
    'helping make a discord bot',
  ];
</script>

<main>
  <h1>what's now</h1>

  <section>
    <ul>
      {#each things as thing}
        <li>{thing}</li>
      {/each}
    </ul>
  </section>

  <footer>
    <a href="https://nownownow.com/about">(learn more about "now" pages.)</a>
  </footer>
</main>

<style lang="scss">
  main {
    background-color: #74d7c5;
    font-size: 1.25rem;
    padding: 2rem;
  }
  h1 {
    margin-top: 3rem;
    font-size: 4rem;
    text-align: center;

    color: #003726;
    text-shadow: shadow(3px, 1, #008b6c);
  }
  section {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 1rem;
  }

  li::before {
    content: '- ';
  }

  footer {
    margin-top: 2rem;
    text-align: center;

    a {
      color: #005d40;
      &:hover {
        color: #003726;
        text-decoration: underline;
      }
      &:active {
        color: #000;
      }
    }
  }
</style>

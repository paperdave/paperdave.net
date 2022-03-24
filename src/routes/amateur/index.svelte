<main>
  <div class="container">
    <h1>amateur mode enabled!!!</h1>
    <p>
      in a distant universe, someone calls this page an "expert mode." however, this is probably the
      easiest and <em>laziest</em> way to use the website— dave just threw everything on one page. either
      way, have fun.
    </p>

    <a href="/">go back to "adventure" mode</a>

    <h2>all things by dave caruso</h2>

    <p>(dave is still adding everything to the database, so it will not be complete)</p>

    <!-- <div class="search">
      <input type="text" placeholder="search everything..." />
    </div> -->

    <ul>
      <li>
        <code class="year">2020-</code>
        <code> 08-10 </code>
        {' '}
        <span>
          <a href="">intermission</a>
        </span>
      </li>
      <li>
        <code> 08-02 </code>
        {' '}
        <span>
          <a href="">idk man</a>
        </span>
      </li>
      <li>
        <code> 04-07 </code>
        {' '}
        <span>
          <a href="">bread</a>
        </span>
      </li>
      <li>
        <code> 05-43 </code>
        {' '}
        <span>
          <a href="">it is currently hardcoded</a>
        </span>
      </li>
      <li>
        <code class="year">2019-</code>
        <code> 02-05 </code>
        {' '}
        <span>
          <a href="">sdfafdsafd</a>
        </span>
      </li>
    </ul>
  </div>
</main>

<style lang="scss">
  main {
    background-color: #dedede;

    .container {
      width: 750px;
      margin: auto;
      padding-top: 48px;
      padding-bottom: 48px;
    }
  }

  h1,
  h2,
  p,
  ul {
    margin-bottom: 16px;
  }

  h1 {
    font-family: 'Roboto Slab';
    font-size: 3em;
    font-weight: bold;
    color: #d71a25;
    text-shadow: shadow(2px, 0.5, #520505);
  }
  h2 {
    font-family: 'Roboto Slab';
    font-weight: 400;
    margin-top: 50px;
    font-size: 2em;
    color: #000;
  }

  ul {
    position: relative;
  }

  a {
    color: #4b0101;
    text-decoration: underline;
    text-decoration-color: #888;

    &:hover {
      color: #160101;
      text-decoration-color: #160101;
    }

    &:active {
      color: #ff22ed;
      text-decoration-color: #ff22ed;
    }
  }

  .year {
    position: absolute;
    right: 100%;
    transform: translateY(0.75px);
  }

  .search {
    margin-bottom: 16px;

    input {
      background: white;
      color: black;
      border: 1px solid transparent;
      font-family: monospace;
      padding: 8px;
      width: 100%;
      &:focus {
        outline: none;
        border: 1px solid black;
      }
      &::placeholder {
        color: #666;
      }
    }
  }
</style>

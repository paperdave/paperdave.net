<script lang="ts">
  let count = 0;
</script>

<main>
  <h1>dave caruso's website</h1>
  <p>
    a cool thing is happening. i will update this page about once a day. if i
    forget to by like 5pm, send me an email to remind me or ping me on the
    discord.
  </p>

  <ul>
    <li><a href="https://discord.gg/4AbvSXV">the discord</a></li>
    <li><a href="mailto:dave@davecode.me">send email</a></li>
    <li><a href="https://react.davecode.me/q+a">question page</a></li>
  </ul>

  <br />
  <br />
  <br />

  <p>i love svelte.</p>
  <p>
    <button on:click={() => count++}>
      button{count === 0
        ? ''
        : ` has been clicked ${count} time${count === 1 ? '' : 's'}`}
    </button>
  </p>
  <br />
  <br />
  <br />
  <p>&copy; dave caruso 2020. all rights reserved.</p>
</main>

<style lang="scss">
  main {
    background: #cecece;
    color: #101010;
    padding: 2rem;
  }

  p,
  ul,
  h1 {
    margin: 1rem;
    max-width: 500px;
  }

  ul {
    padding-left: 1rem;
  }

  a {
    color: #559f42;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #2f5b42;
    }
  }

  button {
    border: 1px solid black;
    padding: 0.5rem 1rem;
  }
</style>

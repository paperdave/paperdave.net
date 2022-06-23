<script>
  import BackButton from '$lib/components/BackButton.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';

  const things = [
    //
    'college prep @ OU',
    'making a discord bot framework',
    'making another web app',
    'writing software for making videos',
    'producing another song & music video',
  ];
</script>

<Meta title="what dave is doing now" description="short page explaining the current situation" />

<ThemeRoot background="#74d7c5" accent="#74d7c5">
  <div class="root">
    <Paper marginTop>
      <BackButton position="off-center" />
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
    </Paper>
  </div>
</ThemeRoot>

<style lang="scss">
  .root {
    background: linear-gradient(45deg, #74d7c5, #00b89b);
    flex: 1;
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

  li {
    line-height: 1.25;
  }
  li::before {
    content: '- ';
  }

  footer {
    margin-top: 2rem;
    text-align: center;
  }
</style>

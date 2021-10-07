<script lang="ts">
  import { ArtifactClient, MusicArtifact } from '$lib/client/IArtifactClient';
  import { useEffect } from '$lib/hooks/useEffect';

  let fetchPromise;
  function startFetch() {
    fetchPromise = fetch('/music/page-data.json').then((x) => x.json());
  }
  function clearData() {
    fetchPromise = undefined;
  }

  useEffect(
    () => {
      let valid = true;
      window['Artifact'] = ArtifactClient;
      window['MusicArtifact'] = MusicArtifact;

      if (fetchPromise) {
        fetchPromise.then((json) => {
          if (valid) {
            window['music'] = json.map((x) => new MusicArtifact(x));
          }
        });
      }

      return () => {
        delete window['Artifact'];
        delete window['MusicArtifact'];
        delete window['music'];
        valid = false;
      };
    },
    () => [fetchPromise]
  );
</script>

<main>
  <p>day three:</p>
  <p>so i already learned the basics of svelte, so i think i'll want to get more creative.</p>
  <p>
    i decided to make the music page exist. you can see that <a href="/music">here</a>, but if you
    view this later on it might be modified.
  </p>
  <h2>let's break this down</h2>
  <p>
    first of all, for data i'm using mongodb + mongoose. the website now has a lib folder with a
    handful of utilities, and they are orginized like this:
  </p>
  <ul>
    <li><strong>lib/client</strong>: client-side classes for representing db objects.</li>
    <li><strong>lib/db</strong>: server-side mongoose models and connection.</li>
    <li>
      <strong>lib/components</strong>: svelte components. currently only has {'<BackButton />'}.
    </li>
    <li><strong>lib/hooks</strong>: hook functions i can use in my svelte components.</li>
    <li>
      <strong>lib/svg</strong>: svg icon files. these use the <code>vite-plugin-svelte-svg</code> plugin.
    </li>
  </ul>

  <p>
    then i wrote the api route that has music data, which is a SvelteKit endpoint, which basically
    wraps the mongoose <code>find</code> method.
  </p>

  <div class="margin">
    <button on:click={startFetch}>fetch data</button>
    <button on:click={clearData}>clear</button>
  </div>

  {#await fetchPromise}
    <div class="margin">Loading...</div>
  {:then data}
    {#if data}
      <pre class="code border"><code>{JSON.stringify(data, null, 2)}</code></pre>
    {/if}
  {/await}

  <p>
    since the data structure include a <em>Map</em> and a <em>Date</em> object, i wrote a small class
    on the client side which wraps the JSON data and adds back the fancier types. this just improves
    the developer experience.
  </p>

  <p>
    if you would like to play around with the data, i made <code>Artifact</code> and
    <code>MusicArtifact</code> classes available in the development console, and if the data is
    visible above, that is available in the <code>music</code> variable.
  </p>

  <br />
  <br />
  <br />
  <p><a href="/copyright">&copy; dave caruso 2021. all rights reserved.</a></p>
</main>

<style lang="scss">
  main {
    background: #cecece;
    color: #101010;
    padding: 2rem;
  }

  p,
  ul,
  h2,
  .margin {
    margin: 1rem;
    max-width: 500px;
  }

  .code {
    margin: 1rem;
    width: calc(100vw - 9rem);
    overflow-x: auto;
  }

  ul {
    padding-left: 1rem;
  }

  a {
    color: #007205;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #13b63c;
    }
  }

  button,
  .border {
    border: 1px solid black;
    padding: 0.5rem 1rem;
  }
</style>

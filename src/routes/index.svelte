<script>
  import { goto } from '$app/navigation';

  import Meta from '$lib/components/Meta.svelte';
  import HomepageTitleChar from './_HomepageTitleChar.svelte';

  let inputStack = new Array(20).fill('');
  function handleKeypress(event) {
    const key = event.key;
    if (key.length !== 1) return;
    inputStack.push(key);
    inputStack.shift();
    const phrase = inputStack.join('');
    if (phrase.endsWith('login')) {
      goto('/auth');
    } else if (phrase.endsWith('rqa')) {
      goto('/q+a/respond');
    } else if (phrase.endsWith('admin')) {
      goto('/q+a/respond');
    } else if (phrase.endsWith('qa')) {
      goto('/q+a');
    } else if (phrase.endsWith('video')) {
      goto('/videos');
    } else if (phrase.endsWith('music')) {
      goto('/music');
    } else if (phrase.endsWith('tree')) {
      goto('/treehouse');
    }
  }

  let titleOrder = 'Davecode';
  const titleColors = {
    D: '#007205',
    a: '#006004',
    v: '#006004',
    e: '#007205',
    c: '#007205',
    o: '#329437',
    d: '#720DA1',
  };
</script>

<svelte:window on:keypress={handleKeypress} />

<Meta
  title="davecode: computer art to the limit"
  description="davecode is a creative project by dave caruso to take computer software and its artistic and automation capabilities to the limits." />

<main>
  <flex-row>
    <header>
      <div class="content">
        <h1>
          <!-- prettier formats it dumb -->
          {#each titleOrder as char}
            <HomepageTitleChar color={titleColors[char]}>
              {char.toLowerCase()}
            </HomepageTitleChar>
          {/each}
        </h1>
        <article>
          <p>
            davecode is a creative project by dave caruso to take computer software and its artistic
            and automation capabilities to the limits. on it, you can find a collection of his work
            of all mediums, including original music, abstract videos, video games, and the custom
            software built to make the process go faster.
          </p>
          <p>
            you'll find his art scattered around the internet on sites such as YouTube, but <em
              >this</em>
            site is the main place to find all of the content, for free. he believes Art is not a product,
            and it should not be monetized.
            <a href="/dontate">dontations are optional, but appreciated.</a>
          </p>
          <p>
            there is no correct way to explore the site, that is your challenge to solve, but the
            website is designed to make exploration easy. if this website is too hard for you, you
            can choose to be an <a href="/amatuer">amatuer</a>.
          </p>
          <p class="have-fun">have fun on your adventure, viewer.</p>
        </article>
      </div>
    </header>
    <section class="section-fresh">
      <div class="content">
        <h2>fresh content</h2>
        <ul>
          <li>
            <div class="thumbnail" />
            <h3>Mayday</h3>
            <p>music video</p>
          </li>
        </ul>
        <ul>
          <li>
            <div class="thumbnail" />
            <h3>Phoenix, WRITE!</h3>
            <p>web game</p>
          </li>
        </ul>
      </div>
    </section>
  </flex-row>
  <flex-row class="desktop-inverted-flex">
    <section class="section-categories">
      <h2>categories</h2>
      <article>
        <ul>
          <li>music</li>
          <li>videos</li>
          <li>stories</li>
          <li>games</li>
          <li>applications</li>

          <li>ask a question</li>
          <li>chat on discord</li>
          <li>behind the scenes</li>
          <ul>
            <li>bits & fragments</li>
            <li>journal</li>
            <li>thoughts</li>
            <li>fake admin</li>
          </ul>
          <li>building blocks</li>
          <ul>
            <li>creative toolkit</li>
            <li>plugins</li>
            <li>nerd gear</li>
            <li>documentation</li>
          </ul>
          <li>credits</li>
        </ul>
      </article>
    </section>
    <section class="section-about">
      <h2>about the artist</h2>
      <article>
        <p>
          Dave Caruso is a computer science student based in Michigan. he loves spending time
          tinkering with computers, and had self taught himself programming from the age of 9, and
          has continued studying advanced web and game development since (he made this site from
          scratch with the power of Svelte). choosing to be an expert on JavaScript and TypeScript
          quirks, he has also touched many other areas of programming, including desktop apps,
          software addons, and using other languages like Python, C++, and C#.
        </p>
        <p>
          Aside from computer science, he has a new passion for music, and is currently learning how
          to write, play, record, and produce music, as well as create videos to go with them. All
          of his projects take a huge inspriation from a similiarly-styled musician, Bill Wurtz.
        </p>
        <p>
          He spends most of his free time being productive for <em>davecode</em>, but does allocate
          time to relax with his friends. Dave is writing this chunk, so he is biased, however he
          tells very good jokes and can be the life of the party, but is also a huge introvert so he
          prefers smaller gatherings.
        </p>
        <p>
          <a href="/now">see what he is up to now</a> |
          <a href="mailto:dave@davecode.net">send a letter</a>
        </p>
      </article>
    </section>
  </flex-row>
  <section class="section-externals">
    <div class="content">
      <h2>other websites</h2>
      <p>
        dave most definetly have signed up to other websites, but here's his main public profiles.
      </p>
      <article>
        <ul>
          <li>discord</li>
          <li>github</li>
          <li>twitter</li>
          <li>instagram</li>
          <li>youtube</li>
          <li>twitch</li>
          <li>soundcloud</li>
          <li>spotify</li>
          <li>patreon</li>
          <li>newgrounds</li>
          <li>bandcamp</li>
          <li>tiktok</li>
          <li>itch.io</li>
          <li>apple music</li>
        </ul>
      </article>
    </div>
  </section>
  <footer>
    <div class="content">
      <p>&copy; 2018-2022 All Rights Reserved</p>
      <p>made with love</p>
    </div>
  </footer>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
  }

  .desktop-inverted-flex {
    display: flex;
    flex-direction: row-reverse;
  }

  header,
  section {
    .content {
      display: block;
      padding: 4rem 8rem;
    }

    article {
      margin: 2rem 0;
    }
  }

  header {
    background-color: #a0e3a7;

    h1,
    p {
      margin-bottom: 1rem;
    }

    article {
      max-width: 50rem;
    }

    .have-fun {
      font-size: 2rem;
      font-weight: 500;
    }
  }

  footer {
    background-color: black;
    color: white;
    padding: 2rem;
    text-align: right;
  }

  .section-fresh {
    background-color: #b3e6ff;
    flex: 1;
  }

  .section-categories {
    background-color: #fff9c2;
  }

  .section-about {
    background-color: #e089c8;
  }

  .section-externals {
    background-color: #ade6dc;
    h2,
    p {
      text-align: center;
    }

    article {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
    }

    li {
      transform: rotate(-45deg);
    }
  }

  flex-row {
    flex: 1;
    display: flex;
    flex-direction: row;
  }
</style>

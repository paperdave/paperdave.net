<script>
  import Meta from '$lib/components/Meta.svelte';
</script>

<Meta
  title="things i'm known for"
  description={`here is a brief list of the notible things i've done, as the rest of the internet defines "notable" and "popular."`} />

<main>
  <article class="root">
    <h1>things i'm known for</h1>
    <p>
      here is a brief list of the <em>notible</em> things i've done, as the rest of the internet defines
      "notable" and "popular."
    </p>

    <section class="project">
      <div class="photo">
        <!--  -->
      </div>

      <article class="info">
        <h2>Pheonix, WRITE!</h2>
        <date>2021-10-26</date>
        <p>
          For the <a href="https://itch.io/jam/ludwig-2021">Ludwig Jam (2021)</a>, a game jam hosted
          by the livestreamer of the same name, me and a friend made a rage typing game where you
          type missing letters of his stream's captions. It was featured on stream and
          <a href="https://www.youtube.com/watch?v=u3-MjUVwuYU">on Ludwig's YouTube channel</a>,
          seen by over 700,000 people, and played over 18,000 times on itch.io. It placed fourth in
          over 150 entries, and gave us a prize money of $2,000 to split.
        </p>
        <p>
          <a href="/phoenix-write">Play the game here</a>. Watch the video below:
        </p>
        <iframe
          class="yt"
          src="https://www.youtube-nocookie.com/embed/u3-MjUVwuYU"
          title="YouTube Video Player"
          frameborder="0"
          allow="clipboard-write; encrypted-media"
          allowfullscreen />
      </article>
    </section>
    <section class="project">
      <div class="photo">
        <!--  -->
      </div>

      <article class="info">
        <h2>Visual Cover of "Money" by Bill Wurtz</h2>
        <date>2021-06-03</date>
        <p>
          A "visual cover" what I call a music video, but for someone else's song. As in, it's a
          cover, but for only it's visuals. I made one for a song by Bill Wurtz, and because my
          visual style is very similar to his, it was seen by a lot of his fans as well as mine. At
          the time of writing, it's one of my most viewed videos on the platform.
        </p>
        <iframe
          class="yt"
          src="https://www.youtube-nocookie.com/embed/SCrTO6SaMbw"
          title="YouTube Video Player"
          frameborder="0"
          allow="clipboard-write; encrypted-media"
          allowfullscreen />
      </article>
    </section>
    <section class="project">
      <div class="photo">
        <!--  -->
      </div>

      <article class="info">
        <h2>Elemental 4</h2>
        <date>2020-11-19</date>
        <p>
          Elemental 4 is a recreation of the game Elemental 3 made with modern web technologies. In
          the game, you combine multiple "Elements" to create new elements, such as Earth + Air =
          Dust, and so on. If a combination does not exist, an automated crowdsourcing system is in
          place to create it. Like the original, I had to shut it down due to technical issues, but
          in it's run time, over 14,000 elements were created through a grand total of 300,000
          votes, with over 5,700 element owners (unique users who sent the first vote for a new
          element). Since I shut it down due to issues with my backend, it has been forked for more
          continuations of the game. At some point, I would like to write a blog about all the
          things I learned making this.
        </p>
        <p>Here is a video of Cary Huang, the original creator of Elemental 3, playing the game:</p>
        <iframe
          class="yt"
          src="https://www.youtube-nocookie.com/embed/ZjHtkK5RVEU"
          title="YouTube Video Player"
          frameborder="0"
          allow="clipboard-write; encrypted-media"
          allowfullscreen />
      </article>
    </section>
  </article>
</main>

<style lang="scss">
  .root {
    margin: auto;
    padding: 1rem;
    max-width: 50rem;
  }

  section {
    margin: 2rem 0;
  }

  .yt {
    border: 1px solid hsla(var(--fg), 0.2);
    border-radius: 5px;
    aspect-ratio: 16/9;
    width: 100%;
    max-width: 30rem;
  }

  date {
    margin-top: -0.75rem;
  }
</style>

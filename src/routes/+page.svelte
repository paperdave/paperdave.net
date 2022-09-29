<script lang="ts">
  import { ThemeRoot } from '$ui';
  import Button from '$ui/input/Button.svelte';
  import { LCHPalette } from '$ui/theme/LCHPalette';

  let background = '#eeeeee';
  let primary: string | undefined = undefined;

  function randomizeColor() {
    background =
      '#' +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0');

    const primaryPal = LCHPalette.fromHex(background);
    console.log(primaryPal.chroma);
    primaryPal.chroma += 120;
    console.log(primaryPal.chroma);
    console.log('--');
    primary = primaryPal.hexOn(0);
  }
</script>

<ThemeRoot {background} {primary}>
  <layout-container size="normal">
    <h1>paperdave</h1>

    <p>
      paperdave is a creative project by Dave Caruso to take computer software and its artistic and
      automation capabilities to the limits. on it, you can find a collection of his work of all
      mediums, including original music, abstract videos, online games, and the custom software
      built to make his processes go faster.
    </p>

    <p>
      the website is under construction, yet again. dave messed up some site configuration, and was
      using an old version of sveltekit. moving the code to the new version would be a lot of work.
    </p>

    <div>
      <Button variant="primary" on:click={randomizeColor}>Change Theme</Button>
    </div>

    <h2>notable things</h2>
    <ul>
      <li>
        <code>coming soon</code> - song: mystery of life
      </li>
      <li>
        <code>2022-09-23&nbsp;</code> - interactive:
        <a href="https://scaleofuniverse.com">Scale of the Universe 3</a>
      </li>
      <li>
        <code>2021-10-26&nbsp;</code> - video game:
        <a href="https://paperdave.itch.io/phoenix-write">Phoenix, WRITE!</a>
      </li>
    </ul>

    <h2>places</h2>

    <ul>
      <li><a href="/discord">the discord</a></li>
      <li><a href="https://www.youtube.com/paperdave">youtube channel</a></li>
      <li><a href="/spotify">music on spotify</a></li>
      <li><a href="https://paperdave.itch.io">itch.io games</a></li>
    </ul>
  </layout-container>
</ThemeRoot>

<style lang="scss">
  h1 {
    font-size: 4rem;
    font-weight: 800;
    margin: 0;
  }
</style>

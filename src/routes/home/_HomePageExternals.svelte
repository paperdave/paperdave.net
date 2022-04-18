<script>
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';

  import AppleMusicSVG from '$lib/svg/thirdparty-icons/AppleMusic.svg';
  import BandcampSVG from '$lib/svg/thirdparty-icons/Bandcamp.svg';
  import DiscordSVG from '$lib/svg/thirdparty-icons/Discord.svg';
  import GithubSVG from '$lib/svg/thirdparty-icons/Github.svg';
  import InstagramSVG from '$lib/svg/thirdparty-icons/Instagram.svg';
  import ItchSVG from '$lib/svg/thirdparty-icons/Itch.svg';
  import TidalSVG from '$lib/svg/thirdparty-icons/Tidal.svg';
  import NewgroundsSVG from '$lib/svg/thirdparty-icons/Newgrounds.svg';
  import RedditSVG from '$lib/svg/thirdparty-icons/Reddit.svg';
  import SoundcloudSVG from '$lib/svg/thirdparty-icons/Soundcloud.svg';
  import SpotifySVG from '$lib/svg/thirdparty-icons/Spotify.svg';
  import TikTokSVG from '$lib/svg/thirdparty-icons/TikTok.svg';
  import TwitchSVG from '$lib/svg/thirdparty-icons/Twitch.svg';
  import TwitterSVG from '$lib/svg/thirdparty-icons/Twitter.svg';
  import YoutubeSVG from '$lib/svg/thirdparty-icons/Youtube.svg';

  const otherWebsites = [
    { name: 'Youtube', icon: YoutubeSVG, url: 'https://youtube.com/davecode' },
    { name: 'Github', icon: GithubSVG, url: 'https://github.com/davecaruso' },
    { name: 'Discord', icon: DiscordSVG, url: 'https://discord.gg/4AbvSXV' },
    { name: 'Itch', icon: ItchSVG, url: 'https://davecode.itch.io' },
    { name: 'Reddit', icon: RedditSVG, url: 'https://reddit.com/r/davecode' },
    { name: 'Apple Music', icon: AppleMusicSVG, url: 'https://davecode.net/apple-music' },
    { name: 'Spotify', icon: SpotifySVG, url: 'https://davecode.net/spotify' },
    { name: 'Bandcamp', icon: BandcampSVG, url: 'https://davecode.bandcamp.com' },
    { name: 'Tidal', icon: TidalSVG, url: 'https://listen.tidal.com/artist/30839601' },
    { name: 'Soundcloud', icon: SoundcloudSVG, url: 'https://soundcloud.com/davecaruso' },
    { name: 'Twitch', icon: TwitchSVG, url: 'https://twitch.tv/davecaruso' },
    { name: 'Newgrounds', icon: NewgroundsSVG, url: 'https://davecode.newgrounds.com/' },
    { name: 'TikTok', icon: TikTokSVG, url: 'https://tiktok.com/@dave_caruso' },
    { name: 'Instagram', icon: InstagramSVG, url: 'https://instagram.com/isdavecaruso' },
    { name: 'Twitter', icon: TwitterSVG, url: 'https://twitter.com/isdavecaruso' },
  ];
</script>

<ThemeRoot background="#74d7c5">
  <div class="content">
    <div class="top-border" />
    <flex row center class="two-col">
      <article>
        <h2>other websites</h2>
        <p>
          dave most definetly have signed up to other websites, but here's his main public profiles.
        </p>
        <grid class="website-grid">
          {#each otherWebsites as link}
            <flex>
              <a class="custom icon-btn" href={link.url} title={link.name} target="_blank">
                <svelte:component this={link.icon} />
              </a>
            </flex>
          {/each}
        </grid>
      </article>
      <div class="globe">
        <video aria-hidden src="/assets/home/globe.mp4" loop muted autoplay />
      </div>
    </flex>
  </div>
</ThemeRoot>

<style lang="scss">
  p {
    max-width: 25rem;
    margin: 0 auto;
  }

  .content {
    padding: 3rem 2rem;
    text-align: center;
  }

  .top-border {
    $size: 1.5rem;

    position: absolute;
    z-index: 100;
    top: -$size + 0.02rem;
    left: 0;
    width: 100%;
    height: $size;
    background: url('/assets/home/Water.svg');
    background-size: auto $size;
    animation: slide 8s infinite linear;

    @keyframes slide {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: calc(100 / 39) * $size 0;
      }
    }
  }

  // not particularly proud of this responsive grid lol
  grid {
    margin: 2rem auto;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    display: grid;
    width: 30rem;
    margin: 2rem;
    gap: 2rem;

    a {
      display: flex;
      aspect-ratio: 1;
    }

    @media (max-width: 1000px) {
      margin: 2rem auto;
    }

    @media (max-width: 740px) {
      grid-template-columns: 1fr 1fr 1fr;
      width: 70vw;

      .custom {
        width: 100%;
        max-width: 5rem;
        margin: auto;
      }
    }
  }

  .two-col {
    @media (max-width: 1000px) {
      flex-direction: column;
    }
  }

  .globe {
    width: 26rem;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: calc(100vw - 2rem);
    max-height: calc(100vw - 2rem);
    position: relative;

    video {
      pointer-events: none;
    }
  }

  .icon-btn {
    position: relative;
    display: flex;
    aspect-ratio: 1;
    border-radius: 0.5rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }
    &::before {
      content: ' ';
      position: absolute;
      top: -25%;
      left: -25%;
      width: 150%;
      height: 150%;
      border-radius: 50%;
      transition: background-color 0.2s ease-in-out;
    }
    &:hover::before,
    &:focus::before {
      background: hsla(var(--foreground), 0.1);
    }
    &:active::before {
      background: hsla(var(--foreground), 0.3);
    }
    &:focus-visible::before {
      border: 1px solid hsla(var(--foreground), 1);
    }
  }
</style>

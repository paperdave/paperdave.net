<script>
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { palette } from '$lib/theme';

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

<ThemeRoot background={palette.cyan[200]}>
  <div class="content">
    <div class="top-border" />
    <flex row center class="two-col">
      <flex gap>
        <h2>other websites</h2>
        <p>
          dave most definitely have signed up to other websites, but here's his main public
          profiles.
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
      </flex>
      <div class="globe">
        <video aria-hidden src="/assets/home/globe.mp4" loop muted autoplay />
      </div>
    </flex>
  </div>
</ThemeRoot>

<style lang="scss">
  p {
    margin: 0 auto;
    max-width: 25rem;
  }

  .content {
    padding: 3rem 2rem;
    text-align: center;
  }

  .top-border {
    $size: 1.5rem;

    position: absolute;
    top: -$size + 0.02rem;
    left: 0;
    z-index: 100;
    animation: slide 8s infinite linear;
    background: url('/assets/home/Water.svg');
    background-size: auto $size;
    width: 100%;
    height: $size;

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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 2rem;
    margin: 2rem auto;
    margin: 2rem;
    width: 30rem;

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
        margin: auto;
        width: 100%;
        max-width: 5rem;
      }
    }
  }

  .two-col {
    @media (max-width: 1000px) {
      flex-direction: column;
    }
  }

  .globe {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 26rem;
    max-width: calc(100vw - 2rem);
    max-height: calc(100vw - 2rem);

    video {
      pointer-events: none;
    }
  }

  .icon-btn {
    display: flex;
    position: relative;
    cursor: pointer;
    border-radius: 0.5rem;
    aspect-ratio: 1;

    &:focus {
      outline: none;
    }
    &::before {
      position: absolute;
      top: -25%;
      left: -25%;
      transition: background-color 0.2s ease-in-out;
      border-radius: 50%;
      width: 150%;
      height: 150%;
      content: ' ';
    }
    &:hover::before,
    &:focus::before {
      background: hsla(var(--fg), 0.1);
    }
    &:active::before {
      background: hsla(var(--fg), 0.3);
    }
    &:focus-visible::before {
      border: 1px solid hsla(var(--fg), 1);
    }
  }
</style>

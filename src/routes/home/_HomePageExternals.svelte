<script>
  import ThemeRoot from "$lib/components/ThemeRoot.svelte";

  import AppleMusicSVG from '$lib/svg/thirdparty-icons/AppleMusic.svg?component';
  import BandcampSVG from '$lib/svg/thirdparty-icons/Bandcamp.svg?component';
  import DiscordSVG from '$lib/svg/thirdparty-icons/Discord.svg?component';
  import GithubSVG from '$lib/svg/thirdparty-icons/Github.svg?component';
  import InstagramSVG from '$lib/svg/thirdparty-icons/Instagram.svg?component';
  import ItchSVG from '$lib/svg/thirdparty-icons/Itch.svg?component';
  import MediumSVG from '$lib/svg/thirdparty-icons/Medium.svg?component';
  import NewgroundsSVG from '$lib/svg/thirdparty-icons/Newgrounds.svg?component';
  import PatreonSVG from '$lib/svg/thirdparty-icons/Patreon.svg?component';
  import SoundcloudSVG from '$lib/svg/thirdparty-icons/Soundcloud.svg?component';
  import SpotifySVG from '$lib/svg/thirdparty-icons/Spotify.svg?component';
  import TikTokSVG from '$lib/svg/thirdparty-icons/TikTok.svg?component';
  import TwitchSVG from '$lib/svg/thirdparty-icons/Twitch.svg?component';
  import TwitterSVG from '$lib/svg/thirdparty-icons/Twitter.svg?component';
  import YoutubeSVG from '$lib/svg/thirdparty-icons/Youtube.svg?component';

  const otherWebsites = [
    { name: 'Youtube', icon: YoutubeSVG, url: 'https://youtube.com/davecode' },
    { name: 'Github', icon: GithubSVG, url: 'https://github.com/davecaruso' },
    { name: 'Discord', icon: DiscordSVG, url: '' },
    { name: 'Itch', icon: ItchSVG, url: 'https://davecode.itch.io' },
    { name: 'Twitch', icon: TwitchSVG, url: 'https://twitch.tv/davecaruso' },
    { name: 'Apple Music', icon: AppleMusicSVG, url: '' },
    { name: 'Spotify', icon: SpotifySVG, url: '' },
    { name: 'Bandcamp', icon: BandcampSVG, url: 'https://davecode.bandcamp.com' },
    { name: 'Newgrounds', icon: NewgroundsSVG, url: '' },
    { name: 'Soundcloud', icon: SoundcloudSVG, url: '' },
    { name: 'TikTok', icon: TikTokSVG, url: 'https://tiktok.com/@dave_caruso' },
    { name: 'Instagram', icon: InstagramSVG, url: 'https://instagram.com/isdavecaruso' },
    { name: 'Twitter', icon: TwitterSVG, url: 'https://twitter.com/isdavecaruso' },
    { name: 'Patreon', icon: PatreonSVG, url: 'https://patreon.com/davecaruso' },
    { name: 'Medium', icon: MediumSVG, url: '' },
  ];

  const notifyWebsites = [
    { name: 'Discord', icon: DiscordSVG, url: '' },
    { name: 'Mailing List', icon: DiscordSVG, url: '' },
    { name: 'RSS', icon: DiscordSVG, url: '' },
  ];
</script>

<ThemeRoot background='#74d7c5'>
  <div class="content">
    <article>
      <h2>other websites</h2>
      <p>
        dave most definetly have signed up to other websites, but here's his main public profiles.
      </p>

      <grid class='website-grid'>
        {#each otherWebsites as link}
          <a class='custom' href={link.url} title={link.name} target="_blank">
            <svelte:component this={link.icon} />
          </a>
        {/each}
      </grid>

      <h2>get notified</h2>
      <p>
        when i publish new things, you can find notifications via
      </p>
    </article>
  </div>
</ThemeRoot>

<style lang='scss'>
  p {
    max-width: 25rem;
    margin: 0 auto;
  }
  .content {
    padding: 3rem 2rem;
    text-align: center;
    border-top: 0.15rem solid black;
  }

  grid {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    display: grid;
    width: 100%;
    max-width: 30rem;
    margin: 2rem auto;
    gap: 2rem;

    a {
      display: flex;
      aspect-ratio: 1;
    }
  }
</style>
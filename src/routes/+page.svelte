<script lang="ts">
  import { ThemeRoot } from '$lib';
  import type { PageData } from './$types';

  export let data: PageData;

  const pad = (n: number) => (n < 10 ? `0${n}` : n);

  const external = [
    { title: 'Youtube', url: 'https://youtube.com/paperdave' },
    { title: 'Github', url: 'https://github.com/paperdave' },
    { title: 'Discord', url: 'https://discord.gg/4AbvSXV' },
    { title: 'Itch', url: 'https://davecode.itch.io' },
    { title: 'Apple Music', url: 'https://paperdave.net/apple-music' },
    { title: 'Spotify', url: 'https://paperdave.net/spotify' },
    { title: 'Bandcamp', url: 'https://paperdave.bandcamp.com' },
    { title: 'Tidal', url: 'https://listen.tidal.com/artist/30839601' },
    { title: 'Twitch', url: 'https://twitch.tv/thepaperdave' },
    { title: 'TikTok', url: 'https://tiktok.com/@thepaperdave' },
    { title: 'Instagram', url: 'https://instagram.com/thepaperdave' },
    { title: 'Twitter', url: 'https://twitter.com/thepaperdave' }
  ];
</script>

<svelte:head>
  <title>paperdave</title>
  <meta
    name="description"
    content="i make abstract art and post it online. for free, for everyone."
  />
  <meta
    name="og:description"
    content="i make abstract art and post it online. for free, for everyone."
  />
  <meta name="og:title" content="paperdave" />
  <meta name="og:type" content="website" />
  <meta name="og:image" content="/embed.png" />
  <meta name="twitter:image" content="/embed.png" />
  <meta name="og:url" content="https://paperdave.net" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="keywords" content="music, video, art, multimedia, art, abstract" />
  <meta name="author" content="Dave Caruso" />
  <meta name="robots" content="index, follow" />
</svelte:head>

<ThemeRoot background="#121212" foreground="#ffffff">
  <div style="position:relative;min-height:100vh">
    <header>
      <h1>paperdave</h1>
      <p class="real-name">dave caruso</p>
      <p class="lead">i make abstract art and post it online</p>
    </header>
    <ul class="categories">
      <li class="category">
        <!-- <a href="/music">
          <svg viewBox="0 0 48 48" fill="none">
            <path
              d="M45.612 0.274641L15.7213 3.72397C14.408 3.87597 13.3333 5.08131 13.3333 6.40397V31.4466C12.12 30.952 10.7667 30.6666 9.33333 30.6666C4.18 30.6666 0 34.2466 0 38.6666C0 43.0853 4.18 46.6666 9.33333 46.6666C14.4867 46.6666 18.6667 43.0853 18.6667 38.6666V14.052L42.6667 11.2826V28.7813C41.4533 28.2853 40.1 28 38.6667 28C33.5133 28 29.3333 31.58 29.3333 36C29.3333 40.4186 33.5133 44 38.6667 44C43.82 44 48 40.4186 48 36V2.40397C48 1.08131 46.9253 0.123974 45.612 0.274641Z"
            />
          </svg>
          <span>music</span>
        </a> -->
        <div class="soon">
          <div><strong>soon</strong><br />(music)</div>
        </div>
      </li>
      <li class="category second-column">
        <a href="/videos">
          <svg viewBox="0 0 48 48"
            ><path
              d="M7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h26q1.2 0 2.1.9.9.9.9 2.1v10.75l8-8v20.5l-8-8V37q0 1.2-.9 2.1-.9.9-2.1.9Z"
            /></svg
          >
          <span>videos</span>
        </a>
      </li>
      <li class="category">
        <a href="/games">
          <svg viewBox="0 0 48 48"
            ><path
              d="M7.35 38q-1.9 0-2.975-1.275Q3.3 35.45 3.6 33.2L6 16.45q.4-2.65 2.475-4.55T13.2 10h21.65q2.65 0 4.725 1.9 2.075 1.9 2.475 4.55L44.4 33.2q.3 2.25-.775 3.525T40.65 38q-1.15 0-1.95-.375t-1.35-.925l-5.2-5.2h-16.3l-5.2 5.2q-.55.55-1.35.925T7.35 38ZM35 26q.8 0 1.4-.6.6-.6.6-1.4 0-.8-.6-1.4-.6-.6-1.4-.6-.8 0-1.4.6-.6.6-.6 1.4 0 .8.6 1.4.6.6 1.4.6Zm-4.25-6.5q.8 0 1.4-.6.6-.6.6-1.4 0-.8-.6-1.4-.6-.6-1.4-.6-.8 0-1.4.6-.6.6-.6 1.4 0 .8.6 1.4.6.6 1.4.6ZM15 25.75h2.5V22h3.75v-2.5H17.5v-3.75H15v3.75h-3.75V22H15Z"
            /></svg
          >
          <span>games</span>
        </a>
      </li>
      <li class="category second-row second-column">
        <a href="/stories">
          <svg viewBox="0 0 48 48"
            ><path
              d="M28 19.3v-2.4q1.65-.7 3.375-1.05Q33.1 15.5 35 15.5q1.3 0 2.55.2 1.25.2 2.45.5v2.2q-1.2-.45-2.425-.675Q36.35 17.5 35 17.5q-1.9 0-3.65.475T28 19.3Zm0 11v-2.45q1.65-.7 3.375-1.025Q33.1 26.5 35 26.5q1.3 0 2.55.2 1.25.2 2.45.5v2.2q-1.2-.45-2.425-.675Q36.35 28.5 35 28.5q-1.9 0-3.65.45T28 30.3Zm0-5.5v-2.4q1.65-.7 3.375-1.05Q33.1 21 35 21q1.3 0 2.55.2 1.25.2 2.45.5v2.2q-1.2-.45-2.425-.675Q36.35 23 35 23q-1.9 0-3.65.475T28 24.8Zm-2.4 10.7q2.5-1.25 4.9-1.875Q32.9 33 35.6 33q1.9 0 3.925.3t3.475.8V12.65q-1.7-.85-3.6-1.25-1.9-.4-3.8-.4-2.7 0-5.225.825-2.525.825-4.775 2.325ZM24.1 40q-2.55-1.9-5.55-2.925T12.4 36.05q-1.85 0-3.6.45t-3.5 1.1q-1.15.55-2.225-.15Q2 36.75 2 35.45V12.3q0-.75.35-1.375T3.4 9.95q2.1-1 4.375-1.475Q10.05 8 12.4 8q3.15 0 6.125.85t5.575 2.6q2.55-1.75 5.475-2.6Q32.5 8 35.6 8q2.35 0 4.6.475 2.25.475 4.35 1.475.7.35 1.075.975T46 12.3v23.15q0 1.4-1.125 2.125-1.125.725-2.225.025-1.7-.7-3.45-1.125-1.75-.425-3.6-.425-3.15 0-6.05 1.05T24.1 40Z"
            /></svg
          >
          <span>stories</span>
        </a>
      </li>
      <li class="category second-row">
        <a href="/q+a">
          <svg viewBox="0 0 48 48"
            ><path
              d="M4 34V6.1q0-.7.65-1.4T6 4h25.95q.75 0 1.4.675Q34 5.35 34 6.1v17.8q0 .7-.65 1.4t-1.4.7H12Zm10.05 2q-.7 0-1.375-.7T12 33.9V29h25V12h5q.7 0 1.35.7.65.7.65 1.45v29.8L36.05 36Z"
            /></svg
          >
          <span>q+a</span>
        </a>
      </li>
      <li class="category second-row second-column">
        <a href="/donate">
          <svg viewBox="0 0 48 48">
            <path
              fill-rule="evenodd"
              d="M10.6047 27.69L2.11998 19.2053C0.0373168 17.1226 0.0373168 15.6306 2.11998 13.5479L13.4333 2.23461C15.516 0.151941 17.008 0.151941 19.0906 2.23461L27.7837 10.9276C29.2168 10.4749 30.4054 11.6626 30.4054 11.6626L33.2334 14.4906L33.2327 14.4925L46.432 27.6906C48.5147 29.7733 48.5147 33.1506 46.432 35.2333L35.1187 46.5466C33.036 48.6293 29.6587 48.6293 27.576 46.5466L20.0334 39.004C20.0334 39.004 19.0907 41.832 16.7334 39.476L9.66137 32.404C8.75604 31.4986 8.74804 29.548 9.66137 28.6333L10.6047 27.69ZM12.019 26.2759L7.58159 21.8385L13.7107 15.7093L18.1484 20.147L12.019 26.2759ZM20.0338 18.2617L26.1618 12.1342L21.7238 7.69622L15.596 13.824L20.0338 18.2617ZM19.838 5.81034L13.7107 11.9387L10.1342 8.36215L14.8475 3.64882C15.7868 2.70955 16.1889 2.67261 16.262 2.67261C16.3351 2.67261 16.7372 2.70955 17.6764 3.64882L19.838 5.81034ZM8.24839 10.248L3.5342 14.9622C2.59492 15.9014 2.55798 16.3035 2.55798 16.3766C2.55798 16.4497 2.59492 16.8518 3.5342 17.7911L5.69626 19.9531L11.8254 13.824L8.24839 10.248Z"
            />
          </svg>

          <span>donate</span>
        </a>
      </li>
      <div aria-hidden="true" style="height:7rem" />
      <!-- <li class="category third-row">
        <a href="/blog">
          <span>blog</span>
        </a>
        <span class="soon">soon</span>
      </li>
      <li class="category third-row">
        <a href="/journal">
          <span>jorunal</span>
        </a>
        <span class="soon">soon</span>
      </li>
      <li class="category third-row">
        <a href="/bits">
          <span>bits</span>
        </a>
        <span class="soon">soon</span>
      </li> -->
    </ul>
    <div class="new-container">
      <h2>the newest art</h2>
      <ul class="new">
        {#each data.newArt as artifact}
          {@const date = `${artifact.date.getFullYear()}-${pad(artifact.date.getMonth() + 1)}-${pad(
            artifact.date.getDate()
          )}`}
          <li class="new-btn">
            <a href={artifact.url}>
              <div class="title">{artifact.title}</div>
              <div class="desc">{artifact.type} <span class="slash">/</span> {date}</div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div class="social-container">
      <h2>social</h2>
      <ul class="social">
        {#each external as link}
          <li class="social-btn">
            <a href={link.url}>
              <img src="/social-icon/{link.title.replaceAll(' ', '')}.svg" alt={link.title} />
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <footer>2018-2023 &copy; dave caruso</footer>
    <div class="overlays">
      {#each [1, 2, 3, 4, 5, 6, 7] as n}
        <svg viewBox="0 0 234 224" class="o{n}">
          <path
            d="M110.188 2.21644C114.25 -0.738814 119.75 -0.738812 123.812 2.21644L229.222 78.9111C233.284 81.8663 234.983 87.1046 233.432 91.8863L193.169 215.981C191.617 220.763 187.168 224 182.147 224H51.8528C46.8322 224 42.3826 220.763 40.8312 215.981L0.567989 91.8863C-0.98346 87.1046 0.716141 81.8663 4.77789 78.9111L110.188 2.21644Z"
            fill="currentColor"
          />
        </svg>
      {/each}
    </div>

    <div class="background" />
  </div>
</ThemeRoot>

<style lang="scss">
  header {
    position: relative;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 25vw;
  }
  h1 {
    position: absolute;
    top: -16.42vw;
    left: -1.45vw;
    font-size: 19.03vw;
    --text-mono: 1;
  }
  .real-name {
    transform: rotate(90deg);
    position: absolute;
    top: 9vw;
    left: -4.78vw;
    font-size: 1.8vw;
    color: #101010;
    user-select: none;
    font-weight: 600;
  }
  .lead {
    top: 15vw;
    right: -0.24vw;
    position: relative;
    font-size: min(4.55vw, 80px);
    white-space: nowrap;
    text-align: right;
  }
  h2 {
    font-size: 1.5rem;
    text-decoration: underline;
    text-decoration-thickness: 0.2rem;
  }
  li {
    font-size: 1.5rem;
    list-style: none;
  }
  ul {
    padding: 0;
  }
  footer {
    position: absolute;
    text-align: right;
    bottom: 0;
    right: 0;
    padding: 1rem;
  }

  // categories

  .category a {
    color: white;
    border: 2px solid white;
    width: 7rem;
    height: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 1rem;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &:active {
      background-color: white;
      color: #222;
    }

    :global(svg) {
      fill: currentColor;
      width: 3.5rem;
      height: 3.5rem;
    }

    span {
      text-align: center;
    }
  }

  .soon {
    opacity: 0.4;
    pointer-events: none;
    border: 5px solid #888;
    width: 7rem;
    height: 7rem;
    border-radius: 1rem;
    user-select: none;
    display: flex;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    font-weight: 300;
  }

  .categories {
    padding-right: 20%;
    display: grid;
    grid-template-columns: repeat(3, 7rem);
    grid-template-rows: repeat(2, 7rem);
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  // whats new

  .new-container {
    position: absolute;
    right: calc(-10rem + 20vw);
    transform: translateY(-320px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .new {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .new-btn a {
    border: 2px solid white;
    border-radius: 1rem;
    padding: 1rem;
    width: min(25rem, calc(100vw - 2rem));
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .title {
      font-weight: bold;
    }
    .slash {
      font-weight: bold;
      opacity: 0.2;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &:active {
      background-color: white;
      color: #222;
    }
  }

  // social

  .social-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: calc(0);
    width: calc(100vw - 30rem);
  }

  .social {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
  }
  .social a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
    color: #222;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }

  // overlays

  .overlays {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    mix-blend-mode: multiply;
    pointer-events: none;
    background-color: #e763e9;

    * {
      position: absolute;
    }
  }

  .o1 {
    top: -30vw;
    left: -45vw;
    width: 100vw;
    height: 100vw;
    color: #63e963;
    animation: spin 25s linear infinite;
    z-index: 2;
  }
  .o2 {
    top: -20vw;
    left: 40vw;
    width: 100vw;
    height: 100vw;
    color: #63e7e9;
    animation: spin 45s linear infinite reverse;
    z-index: 1;
  }
  .o3 {
    top: 16vw;
    left: calc(40vw - 19.5rem);
    width: 40rem;
    height: 40rem;
    color: #e7e963;
    animation: spin 50s linear infinite;
    z-index: 6;
  }
  .o4 {
    --w: 50rem + 10vw;
    top: calc(25vw - 42rem + (var(--w)) / 2);
    right: calc(15vw - (var(--w)) / 2);
    width: calc(var(--w));
    height: calc(var(--w));
    color: rgb(83, 189, 255);
    animation: spin 20s linear infinite reverse;
    z-index: 7;
  }
  .o5 {
    top: calc(25vw + 15rem);
    left: calc(20vw - 30rem);
    width: 60rem;
    height: 60rem;
    color: #e76363;
    animation: spin 30s linear infinite;
    z-index: 3;
  }
  .o6 {
    --w: 40rem + 25vw;
    top: calc(50rem - 25vw + (var(--w)) / 2);
    left: calc(60vw - 10rem - (var(--w)) / 2);
    width: calc(var(--w));
    height: calc(var(--w));
    color: #6a63e7;
    animation: spin 30s linear infinite reverse;
    z-index: 10;
  }
  .o7 {
    bottom: -18rem;
    right: -10rem;
    width: 30rem;
    height: 30rem;
    color: #96e763;
    animation: spin 10s linear infinite;
    z-index: 8;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .background {
    pointer-events: none;
    background-color: #121212;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    mix-blend-mode: screen;
  }

  a {
    color: inherit;
  }

  // media queries

  @media (max-width: 700px) {
    .categories {
      padding-right: 0;
      padding-left: 2rem;
      padding-top: 2rem;
      grid-template-columns: repeat(2, 7rem);
      justify-content: flex-start;
    }
    .second-column {
      transform: translateY(3rem);
    }
    .o4 {
      top: calc(25vw + 2rem + (var(--w)) / 2);
    }
    .social {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 701px) {
    .second-row {
      transform: translateX(3rem);
    }
  }

  @media (max-width: 1354px) and (min-width: 701px) {
    .new-container {
      transform: translateY(-85px);
      right: 4rem;
    }

    .o4 {
      top: calc(25vw - 22rem + (var(--w)) / 2);
    }
  }

  @media (max-width: 1000px) {
    .new-container {
      position: relative;
      margin-bottom: 2.5rem;
      transform: none;
      width: 100%;
      left: 0;
    }

    .o4 {
      top: calc(25vw - 5rem + (var(--w)) / 2);
      left: calc(50vw - (var(--w)) / 2);
    }

    .social-container {
      width: 100%;
    }
  }

  @media (min-width: 1700px) {
    .social-container {
      position: relative;
      width: calc(100vw - 100rem);
      left: 10rem;
    }
  }

  @supports not (mix-blend-mode: screen) {
    .background {
      display: none;
    }
  }
  @supports not (mix-blend-mode: multiply) {
    .overlays {
      opacity: 0.1;
    }
  }
</style>

<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';

  import Canvas from '$lib/components/Canvas.svelte';
  import { resolveError } from '$lib/utils/promise';
  import { VaultBackground } from './_VaultBackground';

  const bg = new VaultBackground();
  let contentRef: HTMLDivElement | undefined;

  let value = '';
  let redFlash = false;

  function bgShake() {
    bg.shake(contentRef);
    redFlash = true;
    setTimeout(() => {
      redFlash = false;
    }, 1250);
  }

  async function submit(ev: Event) {
    ev.preventDefault();

    const { data: r } = await resolveError(
      fetch(`/vault/get-vault?k=${encodeURIComponent(value)}`)
    );

    if (!r || r.status !== 200) return bgShake();

    const json = await r.json();
    if (!json.result) return bgShake();

    // TODO: actually display
    alert(JSON.stringify(json.result));
  }
</script>

<main>
  <BackButton position="off-center" inverted />
  <Canvas renderer={bg} />

  <div class="gradient" />

  {#if redFlash}
    <div class="redFlash" />
  {/if}

  <div class="content" bind:this={contentRef}>
    <h1>
      <img src="/assets/vault/header.png" alt="The Vault" />
    </h1>
    <p>
      There are many keys to this door, but they have all been lost... Maybe you can find clues
      around the website.
    </p>
    <form action="/api/vault" method="GET" on:submit={submit} autocomplete="off">
      <input
        autoComplete="off"
        type="text"
        name="k"
        id="key"
        placeholder={`Enter a Pass${'\u200b'}word`}
        bind:value
        required />
      <input type="submit" class="submit" value="Unlock" />
    </form>
  </div>
</main>

<style lang="scss">
  @keyframes pulse {
    from {
      background: #222;
    }
    to {
      background: #101010;
    }
  }

  main {
    color: white;
    animation: pulse 5s linear alternate infinite;
  }

  main :global(canvas) {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }

  .content h1 img {
    margin: auto;
    display: block;
    animation: unblur 1s cubic-bezier(0.15, 0.85, 0.5, 1) 100ms backwards;
  }

  .content {
    max-width: 400px;
    margin: auto;
    margin-top: 110px;
    p {
      line-height: 1.15;
      margin-bottom: 32px;
      margin-top: 32px;
    }
    input {
      background: #222;
      border: 2px solid white;
      color: white;
      padding: 0.6em;
      padding-left: 0;
      text-indent: 0.6em;
      font-size: 13.3333px !important;
    }
    input:focus {
      outline: none;
      border-color: rgb(217, 170, 255);
      background: #151515;
    }
    input[type='submit']:active,
    .active {
      outline: none;
      border-color: rgb(171, 71, 255);
      color: rgb(171, 71, 255);
      background: black;
    }
    input[type='text'] {
      flex: 1;
    }
    input[type='submit'] {
      flex: 0 0;
      flex-basis: max-content;
      margin-left: 10px;
    }
    form {
      display: flex;
      margin: 20px;
    }
  }

  @keyframes unblur {
    0% {
      transform: scale(1.5);
      filter: blur(20px);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1);
      filter: blur(0.05px); // keeping a tiny amount of blur fixes a ui glitch in chrome
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .redFlash {
    animation: fadeOut 1s linear 0.2s both;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    mix-blend-mode: color;
    z-index: 999;
    background: red;
    pointer-events: none;
    touch-action: none;
  }

  @keyframes moveup {
    0% {
      transform: translateY(50px);
    }
    to {
      transform: translateY(0px);
    }
  }
  @keyframes moveup2 {
    0% {
      transform: translateY(300px);
      height: 400px;
    }
    to {
      transform: translateY(0px);
      height: 470px;
    }
  }
  @keyframes moveupfade {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .gradient {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    background: linear-gradient(0, rgba(217, 170, 255, 0.45), transparent);
    mix-blend-mode: hard-light;
    transform: translateZ(0);
    will-change: transform;
    animation: moveup2 3s cubic-bezier(0.165, 0.84, 0.44, 1) 250ms both,
      moveupfade 4s ease-out 250ms both;
    pointer-events: none;
    touch-action: none;
  }
</style>

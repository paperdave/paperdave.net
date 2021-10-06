<script lang="ts">
  import { MusicArtifact } from '$lib/client/IArtifactClient';
  import PlaySVG from '$lib/svg/Play.svg?component';
  import PauseSVG from '$lib/svg/Pause.svg?component';
  import DownloadSVG from '$lib/svg/Download.svg?component';
  import { useEffect } from '$lib/hooks/useEffect';
  import { Circle } from 'svelte-loading-spinners';
  import { slide } from 'svelte/transition';

  export let artifact: MusicArtifact;

  let expanded = false;
  let audioElement: HTMLAudioElement;
  let playing = false;
  let initialLoad = true;
  let loading = false;
  let showLoading = false;

  // I wish there was a nicer way of doing this, maybe turn this into a component
  useEffect(
    () => {
      if (!playing && loading) {
        let timer = setTimeout(() => {
          showLoading = true;
        }, 250);
        return () => clearTimeout(timer);
      } else {
        showLoading = false;
      }
    },
    () => [playing, loading]
  );

  function play() {
    expanded = !expanded;
    return;
    if (initialLoad) {
      initialLoad = false;
      loading = true;
    }
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }
</script>

<main>
  <audio
    src={artifact.file}
    preload="none"
    bind:this={audioElement}
    on:playing={() => (playing = true)}
    on:pause={() => (playing = false)}
    on:durationchange={() => (loading = true)}
    on:canplay={() => (loading = false)}
  />

  <header>
    <div
      class="icon play"
      on:click={play}
      on:keypress={(ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          play();
        }
      }}
      tabindex="0"
    >
      {#if showLoading}
        <Circle color="#52501c" size={2} unit="rem" duration="1s" />
      {:else if !playing}
        <PlaySVG />
      {:else}
        <PauseSVG />
      {/if}
    </div>
    <div class="title">
      <h3>{artifact.title}</h3>
      <div class="tags">
        {#each artifact.tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    </div>
    <a href={artifact.file} target="_blank" class="icon">
      <DownloadSVG />
    </a>
  </header>
  {#if expanded}
    <section transition:slide={{ duration: 300 }}>
      <p>cool</p>
    </section>
  {/if}
</main>

<style lang="scss">
  main {
    color: #52501c;
    padding: 0rem 1rem 0rem 0.5rem;
    width: 700px;
    margin: 1rem auto;
    height: 100%;
    border: 2px solid #52501c33;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.05);
    background-color: #fffcdc;
    display: flex;
    flex-direction: column;
  }
  header {
    margin: 1rem 0;
    height: 4rem;
    display: flex;
    align-items: center;
  }
  h3 {
    font-size: 1.75rem;
    flex: 1;
    display: flex;
    align-items: center;
    transform: translateY(-0.25rem);
  }
  .title {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .tags {
    display: flex;
  }
  .tag {
    padding: 0.25rem 0.5rem;
    margin: 0 0.5rem 0 0;
    border-radius: 0.5rem;
    background-color: #e2ff90;
    font-size: 0.75rem;
    font-weight: 500;
  }
  .icon {
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 100ms ease-in-out;
    & > :global(svg) {
      width: 2rem;
      height: 2rem;
    }
    &.play > :global(svg) {
      width: 2.5rem;
      height: 2.5rem;
    }
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
</style>

<script context="module" lang="ts">
  function formatDate(date: Date) {
    return [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()]
      .map((val) => String(val).padStart(2, '0'))
      .join('-');
  }
</script>

<script lang="ts">
  import { MusicArtifact } from '$lib/client/IArtifactClient';
  import PlaySVG from '$lib/svg/Play.svg?component';
  import PauseSVG from '$lib/svg/Pause.svg?component';
  import DownloadSVG from '$lib/svg/Download.svg?component';
  import { useEffect } from '$lib/hooks/useEffect';
  import { Circle } from 'svelte-loading-spinners';
  import { slide } from 'svelte/transition';

  export let artifact: MusicArtifact;

  let trackDiv: HTMLDivElement;
  let expanded = false;
  let audioElement: HTMLAudioElement;
  let playing = false;
  let initialLoad = true;
  let loading = false;
  let showLoading = false;
  let isDragging = false;

  let progress = 0;

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

  useEffect(
    () => {
      if (audioElement) {
        audioElement.addEventListener('timeupdate', () => {
          if (audioElement.currentTime > 0) {
            progress = audioElement.currentTime / audioElement.duration;
          }
        });
        audioElement.addEventListener('ended', () => {
          playing = false;
        });
      }
    },
    () => [audioElement]
  );

  function play() {
    expanded = true;
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

  function playheadDrag(ev: MouseEvent) {
    ev.preventDefault();
    isDragging = true;
    let isPlaying = !audioElement.paused;
    audioElement.pause();
    function drag(ev: MouseEvent) {
      const bounds = trackDiv.getBoundingClientRect();
      const x = ev.clientX - bounds.left;
      const percent = x / bounds.width;
      audioElement.currentTime = audioElement.duration * percent;
    }
    drag(ev);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', drag);
      if (isPlaying) {
        play();
      }
      isDragging = false;
    });
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
        <span class="date">{formatDate(artifact.date)}</span>
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
      <div
        class="track"
        style="--progress:{progress * 100}"
        bind:this={trackDiv}
        on:mousedown={playheadDrag}
        class:isDragging
      >
        <div class="progress" />
        <div class="playhead">
          <div class="playhead-content" />
        </div>
      </div>
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
  .date {
    margin-right: 0.5rem;
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
  section {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 1rem 1rem 1rem;
  }
  .track {
    height: 0.5rem;
    background-color: rgba(82, 80, 28, 0.2);
    border-radius: 0.25rem;
    position: relative;
  }
  .progress {
    height: 100%;
    background-color: rgba(82, 80, 28, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    border-top-right-radius: 0rem;
    border-bottom-right-radius: 0rem;
    width: calc(var(--progress) * 1% + 0.25rem - (var(--progress) / 100) * 0.25rem);
  }
  .playhead {
    height: 100%;
    width: 0.5rem;
    position: absolute;
    left: 0;
    top: 0;
    left: calc(var(--progress) * 1%);
    transform: translateX(calc(var(--progress) * -1%));
  }
  .playhead-content {
    height: 100%;
    width: 100%;
    border-radius: 0.25rem;
    background-color: #52501c;
    transition: transform 100ms ease-in-out;
    transform: scale(1.5);
    &:hover {
      transform: scale(1.7);
    }
    &.isDragging {
      transform: scale(2);
    }
  }
</style>

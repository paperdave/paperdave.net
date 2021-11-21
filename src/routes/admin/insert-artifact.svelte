<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ session, page }) => {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/auth?r=' + encodeURIComponent(page.path),
      };
    }

    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  import BackButton from '$lib/components/BackButton.svelte';
  import {
    Artifact,
    FileArtifact,
    MusicArtifact,
    VideoArtifact,
    AppArtifact,
    FragmentArtifact,
    GraveyardArtifact,
    JournalArtifact,
    NerdGearArtifact,
    GameArtifact,
    SoftwareArtifact,
    StoryArtifact,
    WordMagnetArtifact,
    SquareArtifact,
  } from '$lib/structures';

  const typeMap: Record<string, typeof Artifact> = {
    video: VideoArtifact,
    music: MusicArtifact,
    app: AppArtifact,
    fragment: FragmentArtifact,
    graveyard: GraveyardArtifact,
    journal: JournalArtifact,
    'nerd-gear': NerdGearArtifact,
    game: GameArtifact,
    story: StoryArtifact,
    'word-magnet': WordMagnetArtifact,
    square: SquareArtifact,    
  };

  let artifactBase = new Artifact();
  let type = Object.keys(typeMap)[0];

  function init(artifact: Artifact) {
    console.log(type);
    artifact.id = artifactBase.id;
    artifact.title = artifactBase.title;
    artifact.thumbnail = artifactBase.thumbnail;
    artifact.tags = artifactBase.tags;
    artifact.date = artifactBase.date;
    return artifact;
  }

  $: artifact = init(new (typeMap[type] ?? Artifact)());

  function updateDate(ev: Event) {
    const date = artifact.date;
    const input = ev.target as HTMLInputElement;
    const value = input.value;
    const dateParts = value.split('-');
    date.setFullYear(parseInt(dateParts[0]) || 0);
    date.setMonth(parseInt(dateParts[1]) - 1 || 0);
    date.setDate(parseInt(dateParts[2]) || 0);
    artifactBase.date = date;
  }
  function updateTime(ev: Event) {
    const date = artifact.date;
    const input = ev.target as HTMLInputElement;
    const value = input.value;
    const timeParts = value.split(':');
    date.setHours(parseInt(timeParts[0]) || 0);
    date.setMinutes(parseInt(timeParts[1]) || 0);
    date.setSeconds(parseInt(timeParts[2]) || 0);
    artifactBase.date = date;
  }

  $: artifact.id = artifactBase.id;
  $: artifact.title = artifactBase.title;
  $: artifact.thumbnail = artifactBase.thumbnail;
  $: artifact.tags = artifactBase.tags;
  $: artifact.date = artifactBase.date;
</script>

<main>
  <BackButton position="corner" href="/admin" text="back to admin" />
  <h1>Artifact Editor</h1>

  <section>
    type =
    <select bind:value={type}>
      {#each Object.keys(typeMap) as type}
        <option value={type}>{type}</option>
      {/each}
    </select>
  </section>
  <h2>Artifact options</h2>
  <section>
    <input type="text" placeholder="id" bind:value={artifactBase.id} />
  </section>
  <section>
    <input type="text" placeholder="title" bind:value={artifactBase.title} />
  </section>
  <section>
    <input type="text" placeholder="thumbnail" bind:value={artifactBase.thumbnail} />
  </section>
  <section>
    <input
      type="date"
      value={[
        artifactBase.date.getFullYear(),
        artifactBase.date.getMonth() + 1,
        artifactBase.date.getDate(),
      ].join('-')}
      on:change={updateDate} />
    <input
      type="time"
      value={[
        artifactBase.date.getHours(),
        artifactBase.date.getMinutes(),
        artifactBase.date.getSeconds(),
      ]
        .map((x) => x.toString().padStart(2, '0'))
        .join(':')}
      on:change={updateTime} />
  </section>

  {#if artifact instanceof FileArtifact}
    <h2>FileArtifact options</h2>
    <section>
      <input type="text" placeholder="file url" bind:value={artifact.file} />
    </section>
  {/if}

  {#if artifact instanceof SoftwareArtifact}
    <h2>SoftwareArtifact options</h2>
    <section>
      <textarea
        cols="30" rows="5" placeholder="description" bind:value={artifact.description} />
    </section>
    <h3>Versions</h3>
  {/if}

  {#if artifact instanceof VideoArtifact}
    <h2>VideoArtifact options</h2>
    <section>
      <input type="text" placeholder="notes url" bind:value={artifact.notes} />
    </section>
    <section>
      <input type="number" placeholder="ttms" bind:value={artifact.ttms} />
    </section>
  {/if}

  {#if artifact instanceof MusicArtifact}
    <h2>MusicArtifact options</h2>
    <section>
      <input type="text" placeholder="sheetmusicImage" bind:value={artifact.sheetmusicImage} />
    </section>
  {/if}

  {#if artifact instanceof AppArtifact}
    <h2>AppArtifact options</h2>
    <section>
      N/A
    </section>
  {/if}

  {#if artifact instanceof FragmentArtifact}
    <h2>FragmentArtifact options</h2>
    <section>
      N/A
    </section>
  {/if}

  {#if artifact instanceof GraveyardArtifact}
    <h2>GraveyardArtifact options</h2>
    <section>
      <input type="text" placeholder="description" bind:value={artifact.description} />
    </section>
    <section>
      <input type="text" placeholder="medium" bind:value={artifact.medium} />
    </section>
    <section>
      <input type="text" placeholder="license" bind:value={artifact.license} />
    </section>
    <h3>Files</h3>
  {/if}

  {#if artifact instanceof JournalArtifact}
    <h2>JournalArtifact options</h2>
    <section>
      todo: editDate
    </section>
  {/if}

  {#if artifact instanceof NerdGearArtifact}
    <h2>NerdGearArtifact options</h2>
    <section>
      N/A
    </section>
  {/if}

  {#if artifact instanceof GameArtifact}
    <h2>GameArtifact options</h2>
    <section>
      N/A
    </section>
  {/if}

  {#if artifact instanceof StoryArtifact}
    <h2>StoryArtifact options</h2>
    <section>
      <input type="text" placeholder="description" bind:value={artifact.description} />
    </section>
    <section>
      <input type="text" placeholder="medium" bind:value={artifact.medium} />
    </section>
    <section>
      todo: finishDate
    </section>
  {/if}

  {#if artifact instanceof WordMagnetArtifact}
    <h2>WordMagnetArtifact options</h2>
    <section>
      N/A
    </section>
  {/if}

  {#if artifact instanceof SquareArtifact}
    <h2>SquareArtifact options</h2>
    <section>
      N/A
    </section>
  {/if}


  <h2>json</h2>
  <section>
    <pre>
      <code>
        {JSON.stringify(artifact.toJSON(), null, 2)}
      </code>
    </pre>
  </section>
</main>

<style lang="scss">
  main {
    padding: 2rem;
  }
  h1 {
    margin-top: 2rem;
  }
  h2 {
    margin: 1rem 0;
  }
  section {
    margin: 0.5rem 0;
  }
  input,
  select {
    border: 1px solid #ccc;
  }
</style>

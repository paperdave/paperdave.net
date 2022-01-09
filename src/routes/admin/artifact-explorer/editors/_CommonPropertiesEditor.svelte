<script context="module" lang="ts">
  import { Artifact, ArtifactVisibility } from '$lib/structures';
  import { Button, ComboBox, TextBox } from 'fluent-svelte';
  import { sentenceCase } from 'change-case';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return true;
  }
</script>

<script lang="ts">
  import BlurHashCanvas from '$lib/components/BlurHashCanvas.svelte';
  import { formatDate } from '$lib/utils/date';
  import { encode } from 'blurhash';
  import { tick } from 'svelte';

  export let artifact: SvelteStore<Artifact>;

  let tagBuffer = [...$artifact.tags].join(', ');

  function updateTags(ev: Event) {
    $artifact.tags = new Set(
      (ev.currentTarget as HTMLInputElement).value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }

  function updateDate(ev: Event) {
    const date = $artifact.date;
    const input = ev.target as HTMLInputElement;
    const value = input.value;
    const dateParts = value.split('-');
    date.setFullYear(parseInt(dateParts[0]) || 0);
    date.setMonth(parseInt(dateParts[1]) - 1 || 0);
    date.setDate(parseInt(dateParts[2]) || 0);
    $artifact.date = date;
  }

  function updateTime(ev: Event) {
    const date = $artifact.date;
    const input = ev.target as HTMLInputElement;
    const value = input.value;
    const timeParts = value.split(':');
    date.setHours(parseInt(timeParts[0]) || 0);
    date.setMinutes(parseInt(timeParts[1]) || 0);
    date.setSeconds(parseInt(timeParts[2]) || 0);
    $artifact.date = date;
  }

  let blurHashLoading = false;
  async function recalculateBlurHash() {
    // Taken from blurhash example
    const loadImage = async (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (...args) => reject(args);
        img.crossOrigin = 'Anonymous';
        img.src = src;
      });

    const getImageData = (image: HTMLImageElement) => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d')!;
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, image.width, image.height);
    };

    const encodeImageToBlurhash = async (imageUrl: string) => {
      const image = await loadImage(imageUrl);
      const imageData = getImageData(image);
      return encode(imageData.data, imageData.width, imageData.height, 4, 3);
    };
    // End blurhash example

    if ($artifact.thumbnail) {
      blurHashLoading = true;
      $artifact.blurhash = 'calculating...';
      await tick();
      $artifact.blurhash = await encodeImageToBlurhash($artifact.thumbnail);
      blurHashLoading = false;
    }
  }

  $: disabled = $artifact.id === '\0';
</script>

<EditorField label="Title">
  <TextBox {disabled} bind:value={$artifact.title} />
</EditorField>
<EditorField label="Direct URL">
  <TextBox {disabled} bind:value={$artifact.id}>
    <span class="url-prefix">https://davecode.net/</span>
  </TextBox>
</EditorField>
<EditorField label="Date">
  <div class="date-picker">
    <TextBox
      {disabled}
      type="text"
      value={formatDate($artifact.date, 'date')}
      on:change={updateDate} />
    <TextBox
      {disabled}
      type="text"
      value={formatDate($artifact.date, 'time')}
      on:change={updateTime} />
  </div>
</EditorField>
<EditorField label="Tags">
  <TextBox {disabled} bind:value={tagBuffer} on:input={updateTags} />
</EditorField>
<EditorField label="Thumbnail URL">
  <TextBox {disabled} bind:value={$artifact.thumbnail} />
</EditorField>
<EditorField label="BlurHash">
  <Button on:click={recalculateBlurHash} disabled={disabled || blurHashLoading}>Recalculate</Button>
  <TextBox bind:value={$artifact.blurhash} disabled={disabled || blurHashLoading} />
</EditorField>
<EditorField label="">
  <div class="thumnail-preview">
    <img src={$artifact.thumbnail} alt="Artifact Thumbnail" />
    {#if $artifact.blurhash}
      <BlurHashCanvas hash={$artifact.blurhash} />
    {/if}
  </div>
</EditorField>
<EditorField label="Visibility">
  <ComboBox
    {disabled}
    bind:value={$artifact.visibility}
    items={Object.keys(ArtifactVisibility).map((key) => ({
      name: key,
    }))} />
</EditorField>

<style lang="scss">
  .url-prefix {
    color: #999;
    font-size: 0.85rem;
    order: -1;
    margin: 0;
    flex: 0 0 auto;
    margin-left: 0.5rem;
    margin-right: -0.5rem;
  }
  .date-picker {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  .thumnail-preview {
    height: 6rem;
    display: flex;
    gap: 1rem;
    & > :global(*) {
      height: 6rem;
      width: 10.6rem;
      display: flex;
    }
  }
</style>

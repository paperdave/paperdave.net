<script context="module" lang="ts">
  import { Artifact, ArtifactVisibility } from '$lib/structures';
  import { ComboBox, TextBox } from 'fluent-svelte';
  import { sentenceCase } from 'change-case';
  import EditorField from '../util/_EditorField.svelte';

  export function applies(artifact: Artifact) {
    return true;
  }
</script>

<script lang="ts">
  import { formatDate } from '$lib/utils/date';

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
</script>

<EditorField label="Title">
  <TextBox bind:value={$artifact.title} />
</EditorField>
<EditorField label="Direct URL">
  <TextBox bind:value={$artifact.id}>
    <span class="url-prefix">https://davecode.net/</span>
  </TextBox>
</EditorField>
<EditorField label="Date">
  <div class="date-picker">
    <TextBox type="text" value={formatDate($artifact.date, 'date')} on:change={updateDate} />
    <TextBox type="text" value={formatDate($artifact.date, 'time')} on:change={updateTime} />
  </div>
</EditorField>
<EditorField label="Tags">
  <TextBox bind:value={tagBuffer} on:input={updateTags} />
</EditorField>
<EditorField label="Thumbnail URL">
  <TextBox bind:value={$artifact.thumbnail} />
</EditorField>
<EditorField label="Visibility">
  <ComboBox
    bind:value={$artifact.visibility}
    items={Object.keys(ArtifactVisibility).map((key) => ({
      name: sentenceCase(key),
      value: key,
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
</style>

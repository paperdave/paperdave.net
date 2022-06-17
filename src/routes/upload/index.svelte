<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Img from '$lib/components/Img.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';
  import { api } from '$lib/session';
  import { formatDate } from '$lib/utils/date';
  import { decodeMediaId } from '$lib/utils/media-id';

  let fileInput: HTMLInputElement;
  let loading = false;
  let result: string | null = null;
  let filename = '';
  let modified = 0;

  $: decoded = result && decodeMediaId(result);

  async function handleSubmit(ev) {
    if (fileInput.files.length === 0) return;
    loading = true;
    result = null;

    filename = fileInput.files[0].name;
    modified = fileInput.files[0].lastModified;

    const response = await api.post(
      '/upload/api?filename=' +
        encodeURIComponent(fileInput.files[0].name) +
        '&modified=' +
        fileInput.files[0].lastModified,
      {
        body: fileInput.files[0],
      }
    );

    result = response.data;
    loading = false;
  }
</script>

<Meta title="upload file" noIndex />

<ThemeRoot>
  <Paper>
    <h1>upload</h1>
    {#if loading}
      <h1>loading!!</h1>
    {/if}
    <form method="post" onsubmit={handleSubmit}>
      <input
        type="file"
        name="data"
        bind:this={fileInput}
        on:change={handleSubmit}
        disabled={loading} />
    </form>
    {#if result}
      <p>
        {filename}, modified {formatDate(modified, 'date-time')}
      </p>
      <p>
        ID: <code>{result}</code>
      </p>
      <pre style="white-space:pre-wrap"><code>{JSON.stringify(decoded, null, 2)}</code></pre>

      <Img src={result} alt="Uploaded Image" />
    {/if}
  </Paper>
</ThemeRoot>

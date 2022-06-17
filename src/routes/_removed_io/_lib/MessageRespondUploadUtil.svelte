<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  import Meta from '$lib/components/Meta.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';

  let fileInput: HTMLInputElement;
  let loading = false;
  let filename = '';
  let out: string = '';
  let url: string = '';

  function onsubmit(ev) {
    if (fileInput.files.length === 0) return;
    loading = true;

    out = '';
    filename = fileInput.files[0].name;

    fetch('/upload/api?filename=' + encodeURIComponent(fileInput.files[0].name), {
      body: fileInput.files[0],
      method: 'POST',
    })
      .then((x) => x.json())
      .then((json) => {
        out = 'data:' + json.hash + '(pasted file)';
        url = json.url;
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        loading = false;
        fileInput.value = '';
      });
  }
</script>

{#if loading}
  <h1>processing upload</h1>
{/if}
<form
  method="post"
  on:submit|preventDefault={onsubmit}
  style="opacity: 0; position: absolute; pointer-events: none;">
  <input
    id="stupid_hardcoded_url"
    type="file"
    name="data"
    bind:this={fileInput}
    on:change={onsubmit}
    disabled={loading} />
</form>

{#if out}
  <h2>upload details</h2>
  <ul>
    <li>filename: <code>{filename}</code></li>
    <li>code: <code style="user-select: all;">{out}</code></li>
  </ul>
  <Button on:click={() => (out = null)}>dismiss</Button>
{/if}

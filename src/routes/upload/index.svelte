<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Meta from '$lib/components/Meta.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';

  let fileInput: HTMLInputElement;
  let loading = false;
  let filename = '';
  let out: string = '';
  let out2: string = '';
  let url: string = '';
  let ratio: string = '';

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
        console.log(json);
        if (json.blurhash) {
          out = json.hash + '/' + json.ratio + '/' + json.blurhash;
          out2 = json.hash + '/' + json.ratio;
        } else {
          out = json.hash;
        }
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

<Meta title="upload file" noIndex />

<ThemeRoot>
  <Paper>
    <h1>upload</h1>
    {#if loading}
      <h1>loading!!</h1>
    {/if}
    <form method="post" on:submit|preventDefault={onsubmit}>
      <input
        type="file"
        name="data"
        bind:this={fileInput}
        on:change={onsubmit}
        disabled={loading} />
    </form>
    {#if out}
      <ul>
        <li>filename: <code>{filename}</code></li>
        <br />
        <li>code: <code style="user-select: all;">{out}</code></li>
        <li>no bh: <code style="user-select: all;">{out2}</code></li>
        <br />
        <li>image url: <a href={url}>{url}</a></li>
      </ul>
    {/if}
  </Paper>
</ThemeRoot>

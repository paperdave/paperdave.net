<script lang="ts">
  export let type: 'text';
  export let value = '';
  export let placeholder = '';

  export let fullWidth = false;
</script>

{#if type === 'text'}
  <input class:fullWidth type="text" bind:value {placeholder} />
{:else if type === 'textarea'}
  <textarea class:fullWidth bind:value {placeholder} />
{/if}

<style lang="scss">
  textarea {
    font-family: monospace;
  }

  textarea,
  input {
    padding: 8px;
    background: black;
    color: white;
    border: 1px solid white;
    resize: none;
    border-radius: 2px;
    &:focus {
      outline: none;
      border: 1px solid #faa719;
    }
    &::placeholder {
      color: #666;
    }
  }

  .fullWidth {
    width: 100%;
  }
</style>

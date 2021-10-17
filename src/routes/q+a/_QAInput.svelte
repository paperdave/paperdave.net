<script lang="ts">
  export let type: 'text' | 'button' | 'submit';
  export let value = '';
  export let placeholder = '';
  export let disabled = false;
  export let fullWidth: boolean = false;
</script>

{#if type === 'text'}
  <input class:fullWidth type="text" bind:value {placeholder} {disabled} />
{:else if type === 'button'}
  <button class:fullWidth on:click {disabled}><slot>{value}</slot></button>
{:else if type === 'submit'}
  <button type="submit" class:fullWidth on:click {disabled}><slot>{value}</slot></button>
{/if}

<style lang="scss">
  * {
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

  button {
    &:hover:not(:disabled) {
      background-color: #333;
    }
    &:active:not(:disabled) {
      background-color: #000;
    }
    &:focus:not(:disabled) {
      color: #faa719;
    }
    &:active:not(:disabled) {
      outline: none;
      border: 1px solid #df4f3d;
      color: #df4f3d;
    }
  }

  *:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .fullWidth {
    width: 100%;
  }
</style>

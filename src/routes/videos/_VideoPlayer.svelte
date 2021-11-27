<script lang="ts">
  export let url: string;
</script>

<container>
  <main>
    <video src={url} controls />
  </main>
</container>

<style lang="scss">
  container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  main {
    position: relative;
    width: calc(100% - 4px);
    aspect-ratio: 16/9;
    background-color: black;
    outline: 2px solid black;
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &:focus {
      outline: none;
    }
  }
</style>

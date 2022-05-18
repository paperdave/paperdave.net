<script lang="ts">
  export let video: VideoMedia;
</script>

<container>
  <main>
    <video src={video.url} controls />
  </main>
</container>

<style lang="scss">
  container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  main {
    position: relative;
    outline: 2px solid black;
    background-color: black;
    aspect-ratio: 16/9;
    width: calc(100% - 4px);
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

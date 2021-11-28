<script lang="ts">
  import { decode } from 'blurhash';

  export let resolutionX = 8;
  export let resolutionY = 8;
  export let punch = 1;

  export let hash: string;

  let canvas: HTMLCanvasElement;

  $: if (hash && canvas) {
    try {
      const pixels = decode(hash, resolutionX, resolutionY, punch);
      const ctx = canvas.getContext('2d')!;
      const imageData = ctx.createImageData(resolutionX, resolutionY);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
    } catch (error) {}
  }
</script>

<canvas bind:this={canvas} width={resolutionX} height={resolutionY} />

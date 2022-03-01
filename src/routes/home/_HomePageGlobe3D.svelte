<script>
  import * as THREE from 'three';
  import * as SC from 'svelte-cubed';
</script>

<main>
  <SC.Canvas>
    <SC.Mesh geometry={new THREE.BoxGeometry()} />
    <SC.PerspectiveCamera position={[1, 1, 3]} />
  </SC.Canvas>
</main>

<style>
  main {
    position: relative;
    flex: 1;
    height: 100%;
  }
</style>

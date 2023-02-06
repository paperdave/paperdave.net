<script lang="ts">
  let trackingData: any | null = null;
  let loadingTrack = false;
  async function track() {
    loadingTrack = true;
    trackingData = await fetch('/q+a/api/example-track').then((r) => r.json());
  }
</script>

<p>soon</p>

<script lang="ts">
  import type { Video } from '@prisma/client';
  import Button from 'src/lib/input-button/Button.svelte';
  import dayjs from 'dayjs';

  export let video: any;
</script>

<Button variant="subtle" href="/videos/{video.id}">
  <layout-flex center class="root">
    <img src={video.thumb} alt={video.title} />
    <div class="title">{video.title}</div>
    <div class="date">{dayjs(video.date).format('YYYY-MM-DD')}</div>
  </layout-flex>
</Button>

<style lang="scss">
  .root {
    padding-bottom: 0.5rem;
  }
  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 16 / 9;
    border: 2px solid rgb(var(--on-bg));
  }
  .title {
    width: 100%;
    margin-top: 0.33rem;
    text-align: left;
    font-size: 1.5rem;
    font-weight: 700;
  }
  .date {
    opacity: 0.5;
    position: absolute;
    bottom: 0;
    right: 0.5rem;
  }
</style>

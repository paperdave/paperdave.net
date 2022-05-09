<script lang="ts">
  import { goto } from '$app/navigation';

  let inputStack = new Array(20).fill('');
  function handleKeypress(event: KeyboardEvent) {
    const key = event.key;
    if (key.length !== 1) return;
    inputStack.push(key);
    inputStack.shift();
    const phrase = inputStack.join('');
    if (phrase.endsWith('login')) {
      goto('/auth');
    } else if (phrase.endsWith('rqa')) {
      goto('/q+a/respond');
    } else if (phrase.endsWith('afe')) {
      goto('/admin/artifact-editor');
    } else if (phrase.endsWith('admin')) {
      goto('/admin');
    } else if (phrase.endsWith('qa')) {
      goto('/q+a');
    } else if (phrase.endsWith('video')) {
      goto('/videos');
    } else if (phrase.endsWith('music')) {
      goto('/music');
    } else if (phrase.endsWith('tree')) {
      goto('/treehouse');
    }
  }
</script>

<svelte:window on:keypress={handleKeypress} />

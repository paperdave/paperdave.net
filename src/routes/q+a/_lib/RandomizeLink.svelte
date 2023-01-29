<script lang="ts">
  import { goto, preloadData } from '$app/navigation';

  export let href: string;

  let prefetched: string[] = [];
  let current: Promise<string> | null = null;

  function getURL() {
    return (
      current ||
      (current = fetch('/q+a/random', {
        headers: {
          Accept: 'text/plain'
        }
      })
        .then((x) => x.text())
        .finally(() => (current = null)))
    );
  }

  function random() {
    if (prefetched.length) {
      goto(prefetched.pop()!);
      prefetchAnother();
    } else {
      getURL().then((x) => goto(x));
    }
  }

  function prefetchAnother() {
    return getURL().then((x) => {
      prefetched.push(x);
      preloadData(x);
    });
  }
</script>

<a
  class="link"
  {href}
  on:click|preventDefault={random}
  on:mouseenter|once={() => {
    prefetchAnother().then(() => prefetchAnother());
  }}>random</a
>

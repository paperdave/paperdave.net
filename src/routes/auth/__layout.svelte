<script>
  import BackButton from '$lib/components/BackButton.svelte';

  import { page } from '$app/stores';
</script>

<main>
  <BackButton
    position="off-center"
    href={$page.path === '/auth' ? '/' : '/auth'}
    text={$page.path === '/auth' ? 'go home' : 'nevermind'} />

  <section>
    <slot />
  </section>
</main>

<style lang="scss">
  main :global(h1) {
    text-shadow: shadow(3px, 1, #005d40);
    color: #00a98a;
    margin: 1.5rem 0;
  }

  main {
    background-color: #f0f0f0;
  }

  main :global(p) {
    margin-bottom: 2rem;
  }

  main :global(form) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  main :global(label) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    text-align: left;
    width: 100%;
  }

  main :global(input) {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #bbb;
    border-radius: 3px;

    &:focus {
      outline: none;
      border-color: #00a98a;
      border-width: 2px;
      padding: 9px;
    }

    &::placeholder {
      color: #ccc;
    }

    &:disabled {
      background-color: #ddd;
      color: #777;
    }
  }

  main :global(.button-container),
  main :global(.link-container) {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }

  main :global(.button-container) {
    justify-content: flex-end;
  }
  main :global(.link-container) {
    justify-content: flex-start;
    margin-top: -0.5rem;
  }

  main :global(button) {
    padding: 5px 10px;
    font-weight: bold;
    font-size: 1.2rem;
    border: none;
  }

  section :global(a) {
    color: #22c6ad;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: #e089c8;
    }
  }
</style>

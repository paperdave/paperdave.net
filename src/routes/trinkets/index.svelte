<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import ButtonRow from '$lib/components/ButtonRow.svelte';

  import Heading from '$lib/components/Heading.svelte';
  import Paper from '$lib/components/Paper.svelte';
  import ThemeRoot from '$lib/components/ThemeRoot.svelte';

  const trinketList = [
    { url: '/io/sandbox', text: 'io sandbox', date: '2022-06-04' },
    { url: '/trinkets/coming-soon', text: 'coming soon', date: '2022-06-03' },
    { url: '/trinkets/not-implemented', text: 'not implemented page', date: '2022-05-14' },
    { url: '/trinkets/theme', text: 'theme editor', date: '2022-05-08' },
    { url: '/trinkets/client-crash', text: 'crash the client', date: '2021-12-27' },
  ];
</script>

<ThemeRoot background="#e7f8e9">
  <Paper marginTop={3}>
    <Heading level="1" center shadow>paperdave.net trinkets</Heading>
    <p>experiments, experiments, experiments!</p>
    <br />
    <ul>
      {#each trinketList as trinket}
        <li>
          <ButtonRow>
            <span>{trinket.date}</span>
            <Button variant="accent" href={trinket.url}>{trinket.text}</Button>
          </ButtonRow>
        </li>
      {/each}
    </ul>
  </Paper>
</ThemeRoot>

<style lang="scss">
  ul {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  p {
    text-align: center;
  }
</style>

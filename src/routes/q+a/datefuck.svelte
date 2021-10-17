<script lang="ts">
  const date1 = new Date();
</script>

<main>
  {date1.getTime()} <br />
  {date1.toLocaleString()} <br />
  {date1.toLocaleString('en-us', { timeZone: 'America/Detroit' })} <br />
</main>

<style lang="scss">
</style>

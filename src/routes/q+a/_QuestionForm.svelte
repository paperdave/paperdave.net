<script lang="ts">
  function submit(ev: Event) {
    ev.preventDefault();
  }
</script>

<form on:submit={submit}>
  <div class="container">
    <textarea name="question" id="question" placeholder="ask a question..." />
  </div>
</form>

<style lang="scss">
</style>

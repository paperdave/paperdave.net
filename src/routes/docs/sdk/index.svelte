<script>
  const sections = Object.keys(API).filter((key) => API[key]?.client);
</script>

<h1>davecode api sdk</h1>

<ul>
  {#each sections as sectionKey}
    <li>
      {sectionKey}
    </li>
    <ul>
      {#each Object.getOwnPropertyNames(API[sectionKey].constructor.prototype)
        .filter((x) => x !== 'constructor')
        .filter((key) => typeof API[sectionKey].constructor.prototype[key] === 'function') as func}
        <li>
          {func}
        </li>
      {/each}
    </ul>
  {/each}
</ul>

<style>
  ul {
    padding: 0;
    padding-left: 20px;
    list-style: circle;
  }
</style>

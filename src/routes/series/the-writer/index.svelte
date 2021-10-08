<script>
  function keydown(ev) {
    ev.key === 'Escape' &&
      document.querySelectorAll('.ec').forEach(function (x) {
        x.checked = false;
      });
  }

  const sourceUrl =
    'https://github.com/davecaruso/davecode.me/tree/main/src/routes/series/the-writer/index.html';
  const rootUrl = 'https://media.davecode.me/content/2020';
  const pages = [
    ['I', 'loxu72p7', 'Canvas', -2, '2020-10-01'],
    ['II', 'y6ajpo8u', 'Feedback', -1, '2020-10-08'],
    ['III', 'k32nvhz1', 'Outside', 0.7, '2020-10-15'],
    ['IV', '2efsqnsb', 'Technology', -1.5, '2020-10-22'],
    ['V', 'yj57m55y', 'Outside', 1.8, '2020-10-29'],
    ['VI', '8vxq1ugn', 'Viewers', -0.6, '2020-11-05'],
    ['VII', 'sjtbytyv', 'Outside', 0.9, '2020-11-12'],
    ['VIII', 't1jr8wls', 'Ideas', -0.2, '2020-11-19'],
    ['IX', 'vnrfcwqa', 'The Word Minimum Requirements', -2.4, , '2020-11-26'],
    ['X', 'dhrqcy8r', 'Final', 7, '2020-12-03'],
  ];
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;800&display=swap"
    rel="stylesheet"
  />
  <title>The Writer</title>
</svelte:head>

<main>
  {#each pages as page, i}
    <input type="checkbox" class="ec" id="e{i + 1}c" />
  {/each}

  <div class="blur">
    <h1>The Writer</h1>
    <p>A story about a person hired to write poetry on a new piece of equipment.</p>

    <div class="entries">
      {#each pages as [roman], i}
        <div class="link"><label for="e{i + 1}c">{roman}</label></div>
      {/each}
    </div>

    <p>Entries were released weekly, the series is complete.</p>
    <p class="footer">
      Written and Programmed by <a href="https://davecode.me/">dave caruso</a>.
    </p>
    <p class="footer">
      <a href={sourceUrl}>view source</a>
    </p>
  </div>

  <div class="overlay overlay1" />

  {#each pages as [, key, name, rotate, date], i}
    <div class="page e{i + 1}d" style="--r:{rotate}">
      <label for="e{i + 1}c" class="overlay" />
      <div class="page-content">
        <div><span style="flex:1">Entry {i + 1} - {name}</span><span>{date}</span></div>
        <img
          src="{rootUrl}/entry{i + 1}_{key}-1x.png"
          srcset={[
            `${rootUrl}/entry${i + 1}_${key}-1x.png 595w`,
            `${rootUrl}/entry${i + 1}_${key}-2x.png 1190w`,
            `${rootUrl}/entry${i + 1}_${key}-3x.png 1785w`,
          ].join(',')}
          alt="Entry #{i + 1}"
        />
      </div>
    </div>
  {/each}
</main>

<style>
  main {
    font: 20px 'Playfair Display';
  }
  h1 {
    font-family: 'Playfair Display';
    font-weight: 800;
    margin: 0.67em;
    font-size: 3em;
    text-align: center;
  }
  @media screen and (max-width: 425px) {
    h1 {
      font-size: 1.5em;
      text-align: center;
    }
  }
  .entries {
    display: grid;
    grid-template-columns: 100px 100px 100px 100px 100px;
    grid-template-rows: 100px 100px;
    margin: 3em auto;
    width: max-content;
  }
  .link {
    font-size: 3rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  label {
    cursor: pointer;
  }
  .link:not(.disabled) label {
    text-decoration: underline;
  }
  .link.disabled {
    color: #999;
  }
  p {
    max-width: 420px;
    margin: auto;
    text-align: center;
  }
  a {
    color: unset;
    text-decoration: underline;
  }
  a:hover {
    color: black;
    text-decoration: underline;
  }
  a:active {
    color: red;
    text-decoration: underline;
  }
  .footer {
    color: #999;
    margin-top: 5em;
  }
  input[type='checkbox'] {
    display: none;
  }
  .overlay,
  .page {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    pointer-events: none;
  }
  .overlay1 {
    opacity: 0;
    background-color: rgba(105, 105, 105, 0.7);
    transition: opacity 500ms cubic-bezier(0.5, 0, 0.35, 1);
  }
  .ec:checked ~ .overlay1 {
    opacity: 1;
  }
  .page {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-content {
    width: calc(min(90vw + 60px, 90vh - 50px) / 1.415);
    height: calc(min(90vw + 60px, 90vh - 50px));
    font-size: calc(min(90vw + 60px, 90vh - 50px) * 0.035);
    background: red;
    position: relative;
    transform: translate(calc(var(--r, 0) * 50px), 100vh) rotate(60deg);
    transition: transform 1s cubic-bezier(0.2, 0, 0, 1);
    color: white;
    pointer-events: all;
  }
  .e1d .page-content,
  .e2d .page-content,
  .e5d .page-content,
  .e8d .page-content,
  .e9d .page-content {
    transform: translate(calc(var(--r, 0) * 50px), 100vh) rotate(-60deg);
  }
  .page-content div {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 0;
    right: 0;
    pointer-events: none;
    display: flex;
    text-shadow: 0 0 9px black;
  }
  .page-content img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 4px 70px rgba(0, 0, 0, 0.3);
  }
  #e1c:checked ~ .e1d > *,
  #e2c:checked ~ .e2d > *,
  #e3c:checked ~ .e3d > *,
  #e4c:checked ~ .e4d > *,
  #e5c:checked ~ .e5d > *,
  #e6c:checked ~ .e6d > *,
  #e7c:checked ~ .e7d > *,
  #e8c:checked ~ .e8d > *,
  #e9c:checked ~ .e9d > *,
  #e10c:checked ~ .e10d > * {
    transform: translate(0, 0) rotate(calc(var(--r, 0) * 1deg));
  }
  #e1c:checked ~ .e1d > label,
  #e2c:checked ~ .e2d > label,
  #e3c:checked ~ .e3d > label,
  #e4c:checked ~ .e4d > label,
  #e5c:checked ~ .e5d > label,
  #e6c:checked ~ .e6d > label,
  #e7c:checked ~ .e7d > label,
  #e8c:checked ~ .e8d > label,
  #e9c:checked ~ .e9d > label,
  #e10c:checked ~ .e10d > label {
    pointer-events: all;
  }

  .blur {
    filter: blur(0px);
    transition: filter 400ms cubic-bezier(0.5, 0, 0.35, 1);
  }
  .ec:checked ~ .blur {
    filter: blur(10px);
  }
</style>

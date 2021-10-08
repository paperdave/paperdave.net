<!--
  UPDATE 2021-10-07: i rewrote this file as a svelte component. that is what shows as of this date
  below is the original file that was running on the apache web server we used before.

  ---

  The writer is a single HTML file, except during the release cycle it was a PHP file to handle automatic releases.

  Figma Source: https://www.figma.com/file/oov5MhU0cIe9eRhWEkB0Oa/The-Writer-Export?node-id=0%3A1

  Skip the head tag as it's the basics, and i have not commented it.
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;800&display=swap" rel="stylesheet">
  <title>The Writer</title>
  <style>
    * { box-sizing: border-box; }
    body { font: 20px "Playfair Display"; }
    h1 { font-size: 3em; text-align: center; }
    @media screen and (max-width: 425px) {
      h1 { font-size: 1.5em; text-align: center; }
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
      margin-top: 5em
    }
    input[type=checkbox] {
      display: none;
    }
    .overlay, .page {
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
      transition: opacity 500ms cubic-bezier(.5,0,.35,1);
    }
    .ec:checked ~ .overlay1 {
      opacity: 1;
    }
    .disabled {
      pointer-events: none;
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
      transition: transform 1s cubic-bezier(.2,0,0,1);
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
      transform: translate(0,0) rotate(calc(var(--r, 0) * 1deg));
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
      transition: filter 400ms cubic-bezier(.5,0,.35,1);
    }
    .ec:checked ~ .blur {
      filter: blur(10px);
    }
  </style>
</head>
<body>
  <!-- 
    I want to quickly comment on how this works. There is NO required JavaScript for this file.
    Theres only code to handle pressing escape to close pages, and automatic loading of new entries.

    How do we keep track of state then? These Checkboxes!
  -->
  <input type="checkbox" class='ec' id='e1c'>
  <input type="checkbox" class='ec' id='e2c'>
  <input type="checkbox" class='ec' id='e3c'>
  <input type="checkbox" class='ec' id='e4c'>
  <input type="checkbox" class='ec' id='e5c'>
  <input type="checkbox" class='ec' id='e6c'>
  <input type="checkbox" class='ec' id='e7c'>
  <input type="checkbox" class='ec' id='e8c'>
  <input type="checkbox" class='ec' id='e9c'>
  <input type="checkbox" class='ec' id='e10c'>
  <!--
    They are put at the start, that way we can use CSS Selectors to do `#e1c:checked ~ .another-element`
  -->

  <!--
    An older version of this project used backdrop-filter, but it's not supported on firefox, so I
    manually added .blur on the main page.
  -->
  <div class="blur">
    <h1>The Writer</h1>
    <p>
      A story about a person hired to write poetry on a new piece of equipment.
    </p>

    <!--
      The Actual Checkboxes are invisible, and they are trigged via <label> elements.
    -->
    <div class="entries">
      <div class="link<?php if(new DateTime() <= new DateTime("2020-10-01 16:30:00")) echo " disabled"; ?>"><label for="e1c">I</label></div>
      <div class="link<?php if(new DateTime() <= new DateTime("2020-10-08 16:30:00")) echo " disabled"; ?>"><label for="e2c">II</label></div>
      <div class="link<?php if(new DateTime() <= new DateTime("2020-10-15 16:30:00")) echo " disabled"; ?>"><label for="e3c">III</label></div>
      <div class="link<?php if(new DateTime() <= new DateTime("2020-10-22 16:30:00")) echo " disabled"; ?>"><label for="e4c">IV</label></div>
      <div class="link<?php if(new DateTime() <= new DateTime("2020-10-29 16:30:00")) echo " disabled"; ?>"><label for="e5c">V</label></div>
      <div class="link<?php if(new DateTime() <= new DateTime("2020-11-05 16:30:00")) echo " disabled"; ?>"><label for="e6c">VI</label></div>
      <div class="link<?php if(new DateTime() <= new DateTime("2020-11-12 16:30:00")) echo " disabled"; ?>"><label for="e7c">VII</label></div>
      <div class="link<?php if(new DateTime() <= new DateTime("2020-11-19 16:30:00")) echo " disabled"; ?>"><label for="e8c">VIII</label></div>
      <div class="link<?php if(new DateTime() <= new DateTime("2020-11-26 16:30:00")) echo " disabled"; ?>"><label for="e9c">IX</label></div>
      <div class="link<?php if(new DateTime() <= new DateTime("2020-12-03 16:30:00")) echo " disabled"; ?>"><label for="e10c">X</label></div>
    </div>

    <p>
      Entries release every Thursday at 4:30pm EST.
    </p>
    <p class="footer">
      Written and Programmed by <a href="https://davecode.me/">dave caruso</a>.
    </p>
  </div>

  <!--
    Now for the overlays, there are two overlays (used to be a third for blurring):
.
    - .overlay1: dark grey bg
    - .page.e#d: page content

    Pages have an --r variable, which controls exact rotation, which is varied to give a better feel.
    They also have another overlay which is a giant <label> for closing it.
  -->

  <div class="overlay overlay1"></div>

  <!-- 
    There is PHP Code to handle releasing these at the right times. Image names have password strings,
    so the content has been all uploaded since day 1.

    That code looks like
    if(new DateTime() > new DateTime("2020-10-01 16:30:00")) { [page] }
  -->
  <?php if(new DateTime() > new DateTime("2020-10-01 16:30:00")) { ?><div class="page e1d" style="--r:-2"><label for='e1c' class="overlay"></label><div class="page-content"><div><span style="flex:1">Entry 1 - Canvas</span><span>2020-10-01</span></div><img src="./entry1_loxu72p7-1x.png" srcset="./entry1_loxu72p7-1x.png 595w,./entry1_loxu72p7-2x.png 1190w,./entry1_loxu72p7-3x.png 1785w" alt="Entry 1 Image"></div></div><?php } ?>
  <?php if(new DateTime() > new DateTime("2020-10-08 16:30:00")) { ?><div class="page e2d" style="--r:-1"><label for='e2c' class="overlay"></label><div class="page-content"><div><span style="flex:1">Entry 2 - Feedback</span><span>2020-10-08</span></div><img src="./entry2_y6ajpo8u-1x.png" srcset="./entry2_y6ajpo8u-1x.png 595w,./entry2_y6ajpo8u-2x.png 1190w,./entry2_y6ajpo8u-3x.png 1785w" alt="Entry 2 Image"></div></div><?php } ?>
  <?php if(new DateTime() > new DateTime("2020-10-15 16:30:00")) { ?><div class="page e3d" style="--r:0.7"><label for='e3c' class="overlay"></label><div class="page-content"><div><span style="flex:1">Entry 3 - Outside</span><span>2020-10-15</span></div><img src="./entry3_k32nvhz1-1x.png" srcset="./entry3_k32nvhz1-1x.png 595w,./entry3_k32nvhz1-2x.png 1190w,./entry3_k32nvhz1-3x.png 1785w" alt="Entry 3 Image"></div></div><?php } ?>
  <?php if(new DateTime() > new DateTime("2020-10-22 16:30:00")) { ?><div class="page e4d" style="--r:-1.5"><label for='e4c' class="overlay"></label><div class="page-content"><div><span style="flex:1">Entry 4 - Technology</span><span>2020-10-22</span></div><img src="./entry4_2efsqnsb-1x.png" srcset="./entry4_2efsqnsb-1x.png 595w,./entry4_2efsqnsb-2x.png 1190w,./entry4_2efsqnsb-3x.png 1785w" alt="Entry 4 Image"></div></div><?php } ?>
  <?php if(new DateTime() > new DateTime("2020-10-29 16:30:00")) { ?><div class="page e5d" style="--r:1.8"><label for='e5c' class="overlay"></label><div class="page-content"><div><span style="flex:1">Entry 5 - Outside</span><span>2020-10-29</span></div><img src="./entry5_yj57m55y-1x.png" srcset="./entry5_yj57m55y-1x.png 595w,./entry5_yj57m55y-2x.png 1190w,./entry5_yj57m55y-3x.png 1785w" alt="Entry 5 Image"></div></div><?php } ?>
  <?php if(new DateTime() > new DateTime("2020-11-05 16:30:00")) { ?><div class="page e6d" style="--r:-0.6"><label for='e6c' class="overlay"></label><div class="page-content"><div><span style="flex:1">Entry 6 - Viewers</span><span>2020-11-05</span></div><img src="./entry6_8vxq1ugn-1x.png" srcset="./entry6_8vxq1ugn-1x.png 595w,./entry6_8vxq1ugn-2x.png 1190w,./entry6_8vxq1ugn-3x.png 1785w" alt="Entry 6 Image"></div></div><?php } ?>
  <?php if(new DateTime() > new DateTime("2020-11-12 16:30:00")) { ?><div class="page e7d" style="--r:0.9"><label for='e7c' class="overlay"></label><div class="page-content"><div><span style="flex:1">Entry 7 - Outside</span><span>2020-11-12</span></div><img src="./entry7_sjtbytyv-1x.png" srcset="./entry7_sjtbytyv-1x.png 595w,./entry7_sjtbytyv-2x.png 1190w,./entry7_sjtbytyv-3x.png 1785w" alt="Entry 7 Image"></div></div><?php } ?>
  <?php if(new DateTime() > new DateTime("2020-11-19 16:30:00")) { ?><div class="page e8d" style="--r:-0.2"><label for='e8c' class="overlay"></label><div class="page-content"><div><span style="flex:1">Entry 8 - Ideas</span><span>2020-11-19</span></div><img src="./entry8_t1jr8wls-1x.png" srcset="./entry8_t1jr8wls-1x.png 595w,./entry8_t1jr8wls-2x.png 1190w,./entry8_t1jr8wls-3x.png 1785w" alt="Entry 8 Image"></div></div><?php } ?>
  <?php if(new DateTime() > new DateTime("2020-11-26 16:30:00")) { ?><div class="page e9d" style="--r:-2.4"><label for='e9c' class="overlay"></label><div class="page-content"><div style="font-size: 0.7em;"><span style="flex:1">Entry 9 - The Word Minimum Requirements</span><span>2020-11-26</span></div><img src="./entry9_vnrfcwqa-1x.png" srcset="./entry9_vnrfcwqa-1x.png 595w,./entry9_vnrfcwqa-2x.png 1190w,./entry9_vnrfcwqa-3x.png 1785w" alt="Entry 9 Image"></div></div><?php } ?>
  <?php if(new DateTime() > new DateTime("2020-12-03 16:30:00")) { ?><div class="page e10d" style="--r:7"><label for='e10c' class="overlay"></label><div class="page-content"><div><span style="flex:1">Entry 10 - Final</span><span>2020-12-03</span></div><img src="./entry10_dhrqcy8r-1x.png" srcset="./entry10_dhrqcy8r-1x.png 595w,./entry10_dhrqcy8r-2x.png 1190w,./entry10_dhrqcy8r-3x.png 1785w" alt="Entry 10 Image"></div></div><?php } ?>

  <script>
    document.addEventListener('keydown', function(ev) {
      ev.key === 'Escape' && document.querySelectorAll('.ec').forEach(function(x) {
        x.checked = false;
      });
    });
  </script>
</body>
</html>

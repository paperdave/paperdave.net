<script lang="ts">
  import MonacoEditor, { type MonacoEditorOptions } from 'src/components/MonacoEditor.svelte';
  import ThemeRoot from 'src/lib/theme-root/ThemeRoot.svelte';
  import MessageRender from '../_lib/MessageRender.svelte';

  let value = `q: what are your thoughts on the custom markdown parser?

i think it's great. you can

- link to artifacts via id: @phoenix-write

- link to questions via url or id:
  http://paperdave.net/q+a/230129181113
  #230129181113

- formats some links for you:
  https://github.com/sveltejs/kit/pull/4964
`;

  const options: MonacoEditorOptions = {
    language: 'qa',
    fontSize: 18,
    wordWrap: 'on'
  };
</script>

<ThemeRoot background="#111" primary="#faa719" secondary="#ff3a32" foreground="#f0f0f0">
  <main>
    <div style="position:relative">
      <MonacoEditor {options} bind:value />
    </div>
    <div>
      <layout-container>
        <MessageRender
          message={{
            date: new Date(),
            type: 'NORMAL',
            text: value
          }}
        />
      </layout-container>
    </div>
  </main>
</ThemeRoot>

<style>
  main {
    display: flex;
    flex-direction: row;
    height: 100vh;
  }
  main > * {
    flex: 1;
  }
</style>

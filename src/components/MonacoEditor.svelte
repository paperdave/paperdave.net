<script context="module" lang="ts">
  export type MonacoEditorOptions =
    import('monaco-editor').editor.IStandaloneEditorConstructionOptions;
</script>

<script lang="ts">
  import type monaco from 'monaco-editor';
  import { onMount, onDestroy } from 'svelte';

  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

  let divEl: HTMLDivElement;
  let Monaco;

  export let editor: monaco.editor.IStandaloneCodeEditor = null as any;
  export let value = '';
  export let options: monaco.editor.IStandaloneEditorConstructionOptions = {};

  onMount(async () => {
    self.MonacoEnvironment = {
      getWorker: function (_moduleId: any, label: string) {
        if (label === 'json') {
          return new jsonWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new cssWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new htmlWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
          return new tsWorker();
        }
        return new editorWorker();
      }
    };

    Monaco = await import('monaco-editor');

    Monaco.editor.defineTheme('qa', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '#faa719' },
        { token: 'question', fontStyle: 'bold', foreground: '#faa719' },
        { token: 'link', foreground: '#00b89b' },
        { token: 'mentionArtifact', foreground: '#faa719' },
        { token: 'mentionMessage', foreground: '#22c6ad' }
      ],
      colors: {
        'editor.background': '#111111',
        'editor.foreground': '#f0f0f0'
      }
    });
    Monaco.languages.register({ id: 'qa' });
    Monaco.languages.setMonarchTokensProvider('qa', {
      tokenizer: {
        root: [
          [/https?:\/\/[^\s]+/, 'link'],
          [/q: .*/, 'question'],
          [/@[^\s]+/, 'mentionArtifact'],
          [/#\d+/, 'mentionMessage']
        ]
      }
    });

    editor = Monaco.editor.create(divEl, {
      value,
      theme: 'qa',
      ...options
    });

    editor.onDidChangeModelContent(() => {
      value = editor.getValue();
    });
  });

  onDestroy(() => {
    editor?.dispose();
  });
</script>

<svelte:window on:resize={() => editor.layout()} />

<div bind:this={divEl} />

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

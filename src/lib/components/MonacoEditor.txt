<!-- 
  Monaco Editor svelte component
-->
<script context="module" lang="ts">
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

  let MonacoPromise: Promise<typeof import('monaco-editor')>;
  if (typeof window !== 'undefined') {
    // @ts-ignore
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
      },
    };
    MonacoPromise = import('monaco-editor');
  }
</script>

<script lang="ts">
  import type monaco from 'monaco-editor';
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let options: monaco.editor.IEditorOptions = {};
  export let value: string = '';

  let root: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;

  export function getEditor() {
    return editor;
  }

  onMount(async () => {
    const monaco = await MonacoPromise;

    editor = monaco.editor.create(root);

    const ev = editor.onDidChangeModelContent(() => {
      value = editor.getValue();
    });

    const events = [
      'DidDispose',
      'DidChangeModelContent',
      'DidChangeModelLanguage',
      'DidChangeModelLanguageConfiguration',
      'DidChangeModelOptions',
      'DidChangeConfiguration',
      'DidChangeCursorPosition',
      'DidChangeCursorSelection',
      'DidChangeModel',
      'DidChangeModelDecorations',
      'DidFocusEditorText',
      'DidBlurEditorText',
      'DidFocusEditorWidget',
      'DidBlurEditorWidget',
      'DidCompositionStart',
      'DidCompositionEnd',
      'DidAttemptReadOnlyEdit',
      'DidPaste',
      'MouseUp',
      'MouseDown',
      'ContextMenu',
      'MouseMove',
      'MouseLeave',
      'KeyUp',
      'KeyDown',
      'DidLayoutChange',
      'DidContentSizeChange',
      'DidScrollChange',
    ];

    const disposables = events.map((event) => {
      return editor['on' + event]((ev) => {
        dispatch(event, ev);
      });
    });

    return () => {
      ev.dispose();
      disposables.forEach((d) => d.dispose());
      editor.dispose();
    };
  });

  $: editor?.updateOptions(options);
  $: if (value !== editor?.getValue()) editor?.setValue(value);
</script>

<main bind:this={root} />

<style lang="scss">
  main {
    flex: 1;
    height: 100%;
  }
</style>

import { dev } from '$app/env';
import { escapeRegex } from '$lib/utils/escape';
import { SourceMapConsumer } from 'source-map-js';
import { parse as parseStackTrace, StackFrame } from 'stacktrace-parser';

const sources = new Map<string, SourceMapConsumer>();

/** Creates a mapped source object */
export async function createMappedSource(error: Error) {
  if (!error.stack) {
    return null;
  }

  const stack = parseStackTrace(error.stack);

  if (dev) {
    return stack.map((frame) => {
      if (frame.file) {
        frame.file = frame.file.replace(/.*davecode.net\//, '');
        frame.file = frame.file.replace(new RegExp(`^${escapeRegex(location.origin)}\/`), '');
      }
      return frame;
    });
    // .filter((frame) => {
    //   // if (frame.file) {
    //   //   if (frame.file.includes('node_modules')) return false;
    //   //   if (frame.file.startsWith('node:internal')) return false;
    //   //   if (frame.file.startsWith('.svelte-kit/')) return false;
    //   //   if (frame.file === 'runtime/client/start.js') return false;
    //   // }
    //   return true;
    // });
  }

  const mappedStack = await Promise.all(
    stack.map(async (frame) => {
      if (frame.file) {
        const source = await getSource(frame.file);
        const original = source.originalPositionFor({
          line: frame.lineNumber ?? 0,
          column: frame.column ?? 0,
        });

        return {
          arguments: frame.arguments,
          file: original.source.replace(/(\.\.\/)+/g, ''),
          lineNumber: original.line,
          column: original.column,
          methodName: original.name,
        } as StackFrame;
      }
      frame.file = frame.file?.replace(/(\.\.\/)+/g, '') ?? '';
      return frame;
    })
  );

  return mappedStack;
}

async function getSource(file: string) {
  if (sources.has(file)) {
    return sources.get(file)!;
  }

  const source = await fetch(file + '.map');
  const sourceMap = await source.json();
  const consumer = await new SourceMapConsumer(sourceMap);
  sources.set(file, consumer);

  return consumer;
}

export function isExternal(frame: StackFrame) {
  return frame.file && !frame.file.startsWith('src/');
}

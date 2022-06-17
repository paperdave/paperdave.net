import { exec } from 'child_process';
import path from 'path';

export function run(command, show = true, stdin = false) {
  return new Promise((resolve, reject) => {
    const proc = exec(command, {
      env: {
        ...process.env,
        PATH: process.env.PATH
          + (process.platform === 'win32' ? ';' : ':')
          + path.resolve('node_modules/.bin'),
        FORCE_COLOR: '1',
      },
    });
    if (show) {
      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stderr);
    }
    if (stdin) {
      process.stdin.pipe(proc.stdin);
    }
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  });
}
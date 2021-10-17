export function debounce<Args extends any[]>(func: (...args: Args) => void, waitTime: number) {
  let timeout: NodeJS.Timer;

  return function (...args: Args) {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(func, waitTime, ...args);
  };
}

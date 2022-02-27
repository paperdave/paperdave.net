export function debounce<Args extends any[]>(func: (...args: Args) => void, waitTime: number) {
  let timeout: NodeJS.Timer;

  return function (...args: Args) {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(func, waitTime, ...args);
  };
}

export function throttle<Args extends any[]>(func: (...args: Args) => void, waitTime: number) {
  let timeout: NodeJS.Timer | undefined = undefined;

  return function (...args: Args) {
    if (timeout) {
      return;
    }

    timeout = setTimeout(() => {
      timeout = undefined;
    }, waitTime);

    func(...args);
  };
}

import { useEffect } from './useEffect';

export function useDebugGlobal(name: string, value: () => any) {
  useEffect(
    () => {
      window[name] = value();
      return () => {
        delete window[name];
      };
    },
    () => [value()]
  );
}

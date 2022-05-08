let next = 0;

export function useId() {
  return `davecode-${next++}`;
}

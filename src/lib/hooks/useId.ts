let next = 0;

export function useId() {
  return `paperdave-${next++}`;
}

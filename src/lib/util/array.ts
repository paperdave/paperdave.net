export function groupArrayToMap<T, K extends string | number>(
  array: T[],
  classifier: (item: T) => K
): Map<K, T[]> {
  const groups = new Map<K, T[]>();
  for (const item of array) {
    const group = classifier(item);
    let list = groups.get(group);
    if (!list) {
      list = [];
      groups.set(group, list);
    }
    list.push(item);
  }
  return groups;
}

export function groupArraySorted<T, K extends string | number>(
  array: T[],
  classifier: (item: T) => K,
  sort: (a: K, b: K) => number
): { key: K; items: T[] }[] {
  const groups = groupArrayToMap(array, classifier);
  return [...groups.entries()]
    .sort(([a], [b]) => sort(a, b))
    .map(([key, items]) => ({ key, items }));
}

import { DataType, Structure } from '@davecode/structures';
import type { Load, LoadInput, LoadOutput } from '@sveltejs/kit';

/** Flattens out .toJSON() benchmarks for this and other potential solutions: https://jsbench.me/htl3960qht/1 */
function flattenToJSON(o: any) {
  if (Array.isArray(o)) {
    return o.map(flattenToJSON);
  } else if (o && typeof o === 'object') {
    if (typeof o.toJSON === 'function') {
      return flattenToJSON(o.toJSON());
    }

    const copy = {};
    for (const prop in o) {
      copy[prop] = flattenToJSON(o[prop]);
    }
    return copy;
  }
  return o;
}

export type CreateLoadInput = DataType | Record<string, DataType>;

function createStructureFromRecord(props: Record<string, DataType>) {
  const s = new Structure('LoadData');
  for (const [key, value] of Object.entries(props)) {
    s.prop(key, value);
  }
  return s.create();
}

export function createLoad(props: CreateLoadInput, extra?: Load | Omit<LoadOutput, 'props'>): Load {
  const struct = props instanceof DataType ? props : createStructureFromRecord(props);

  return (ev: LoadInput) => {
    // Waiting on https://github.com/sveltejs/kit/issues/4944
    ev.props = flattenToJSON(ev.props);

    const deserializedProps = struct.fromJSON(ev.props);

    if (typeof extra === 'function') {
      return extra({
        ...ev,
        props: deserializedProps,
      });
    }

    return {
      ...extra,
      props: deserializedProps,
    };
  };
}
